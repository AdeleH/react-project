/***** NodeJS run your app *****/
// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');

/***** Express Node Framework *****/
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var app = express();

/***** Babel ES6/JSX Compiler *****/
require('babel-register');

/***** React *****/
var swig  = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

/***** models and database *****/
var mongoose = require('mongoose');
var Character = require('./models/character');
var Relationship = require('./models/relationship');
var config = require('./config'); // db connection configuration file

/***** Connection to the db *****/
mongoose.connect(config.database);
mongoose.set('debug', true); // DEBUG!!!
mongoose.connection.on('error', function() {
    console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

/***** Express middlewares *****/
app.set('port', process.env.PORT || 3000); // Express server listening on port 3000 by default
app.use(logger('dev')); // log requests to the console output
app.use(favicon(__dirname + '/public/img/react.ico')); // display the tab icon for your page
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded request into req.body
app.use(express.static(path.join(__dirname, 'public'))); // static files resources (images, fonts, compiled CSS and JavaScript files)

/**
* GET /api/characters
* Return all characters
*/
app.get('/api/characters', function(req, res, next) {
    Character.find({}).exec(function(err, characters) {
        if (err) {
            return next(err);
        }
        return res.send(characters);
    });
});

/**
* GET /api/characters/:id
* Return all characters
*/
app.get('/api/characters/:id', function(req, res, next) {
    var id = req.params.id;
    Character.findOne({_id: id}, function(err, obj) {
        if (err) {
            return next(err);
        }
        return res.send(obj);;
    });
});

/**
* POST /api/characters
* Add new character to the db.
*/
app.post('/api/characters', function(req, res, next) {
    var characterName = req.body.name;
    try {
        Character.findOne({name: characterName}, function(err, obj) {
            if (err) {
                return next(err);
            }
            if (obj !== null) {
                res.status(404).send({ message:
                    "The name \"" + characterName + "\" already exists in the database. Please pick an other one."
                });
            } else {
                var character = new Character({
                    name: characterName
                });
                character.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.send({ message: characterName + ' has been added successfully!' });
                });
            }
        });
    } catch (e) {
        res.status(404).send({ message: characterName +
            ' could not be registered in the database.' });
        }
    });

    /**
    * Return the promise which should return the 2 character of the relationship (async)
    */
    function findRelationshipCharacters(relationship) {
        return new Promise(function(resolve, reject) {
            Character.find({ $or:[{'_id': relationship.id0}, {'_id': relationship.id1}]}).exec(function(err, characters) {
                if (err) {
                    return next(err);
                }
                resolve(characters);
            })
        });
    }

    /**
    * GET /api/relationships
    * Return all relationships
    */
    app.get('/api/relationships', function(req, res, next) {
        Relationship.find({}).exec(function(err, relationships) {
            if (err) {
                return next(err);
            }
            return relationships;
            // return res.send(relationships);
        }).then(function (relationships) {
            let arr = relationships.map((relationship, index) => findRelationshipCharacters(relationship));
            let returned_relationships = [];
            Promise.all(arr).then(function(array_of_two_characters) {
                if (array_of_two_characters.length == relationships.length) {
                    relationships.forEach(function(relationship, index){
                        // No equivalent to "JOIN" with NoSQL DB
                        if (array_of_two_characters[index].length == 2) {
                            // Clone the object
                            var r = {}
                            r._id = relationship._id;
                            r.id0 = relationship.id0;
                            r.id1 = relationship.id1;
                            r.state = relationship.state;

                            // Add here additional data from the characters
                            r.name0 = array_of_two_characters[index][0].name;
                            r.name1 = array_of_two_characters[index][1].name;

                            // Add the new dictionnary to the returned array
                            returned_relationships.push(r);
                        }
                    });
                    return res.send(returned_relationships);
                }
            });
        });
    });

    /**
    * GET /api/relationships/:id
    * Return all relationship for a given character nidame
    */
    app.get('/api/relationships/:id', function(req, res, next) {
        var id = req.params.id;
        Character.findOne({_id: id}, function(err, obj) {
            if (err) {
                return next(err);
            }
            Relationship.find({ $or:[{'name0': obj.name}, {'name1': obj.name}]}).exec(function(err, relationships) {
                if (err) {
                    return next(err);
                }
                return res.send(relationships);
            });
        });
    });

    /**
    * POST /api/relationship/delete
    * Delete a relationship for the given id
    */
    app.post('/api/relationship/delete', function(req, res, next) {
        var relationshipId = req.body.relationshipId;

        Relationship.findOne({ _id: relationshipId }, function(err, relationship) {
            if (err) {
                return next(err);
            }

            if (!relationship) {
                return res.status(404).send({ message: 'Relationship not found.' });
            }

            // Prepare custom message if success
            var msg = "Relationship between " + relationship.name0 + " and "
            + relationship.name1 + " of type \"" + relationship.state
            + "\" has been successfully removed from the database";

            // Remove relationship
            relationship.remove();
            return res.send({ message: msg });
        });
    });

    /**
    * Return the promise which should return the character itself (async)
    */
    function findOrCreateCharacter(_name) {
        return new Promise(function(resolve, reject) {
            Character.findOne({name: _name}, function(err, obj) {
                if (err) {
                    return next(err);
                }
                if (obj === null) {
                    // Register _name if not exists
                    new Character({
                        name: _name
                    }).save(function(err, el) {
                        if (err) {
                            return next(err);
                        }
                        resolve(el);
                    });
                } else {
                    resolve(obj);
                }
            });
        });
    }

    /**
    * POST /api/relationships
    * Add new relationship to the db.
    */
    app.post('/api/relationships', function(req, res, next) {
        var name0 = req.body.name0;
        var name1 = req.body.name1;
        var stateField = req.body.stateField;
        try {
            if (name0 === name1) {
                res.status(404).send({ message: "Names are the same! [" + name0 + "=" + name1 + "]" });
                return false;
            }

            /**
            * Callback Hell Section
            * Trying to use ES6 Promises...
            */
            Promise.all([
                findOrCreateCharacter(name0),
                findOrCreateCharacter(name1)
            ]).then(function([ch0, ch1]) {
                Relationship.findOne({ $or:[{'id0': ch0._id, 'id1': ch1._id}, {'id0': ch1._id, 'id1': ch0._id}]}, function(err, obj) {
                    if (err) {
                        return next(err);
                    }
                    if (obj === null) {
                        // Register the new relationship
                        new Relationship({
                            id0: ch0._id,
                            id1: ch1._id,
                            state: stateField
                        }).save(function(err) {
                            if (err) {
                                console.log(err)
                                return next(err);
                            }
                            res.send({ message: 'The relationship has been added successfully! {' + name0 + ', ' + name1 + '} => ' + stateField + ']' });
                        });
                    } else {
                        // Update relationship
                        obj.state = stateField;
                        obj.save(function(err) {
                            if (err) {
                                console.log(err)
                                return next(err);
                            }
                        });
                        res.send({ message: 'The relationship has been updated successfully! {' + name0 + ', ' + name1 + '} => ' + stateField + ']' });
                    }
                });
            });
        } catch (e) {
            console.log(e);
            res.status(404).send({ message: 'The relationship could not be registered in the database. {' + name0 + ', ' + name1 + '} => ' + stateField + ']' });
        }
    });

    /***** Custom middleware *****/
    app.use(function(req, res) {
        Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
            if (err) {
                res.status(500).send(err.message)
            } else if (redirectLocation) {
                res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
            } else if (renderProps) {
                var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
                var page = swig.renderFile('views/index.html', { html: html });
                res.status(200).send(page);
            } else {
                res.status(404).send('Page Not Found')
            }
        });
    });

    /***** Return and display errors *****/
    app.use(function(err, req, res, next) {
        console.log(err.stack.red);
        res.status(err.status || 500);
        res.send({ message: err.message });
    });

    /***** NodeJS run your app *****/
    var server = require('http').createServer(app);

    /***** Binds and listens for connections on the specified host and port *****/
    server.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
