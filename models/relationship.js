var mongoose = require('mongoose');
var autoincrement = require('mongoose-autoincrement-id');
var Schema = mongoose.Schema;
mongoose.plugin(autoincrement);

var relationshipSchema = new mongoose.Schema({
    _id: {type: String, unique: true, index: true}, // autoincrement
    id0: Number, // {type: Schema.Types.ObjectId, ref: 'characters'},
    id1: Number, // {type: Schema.Types.ObjectId, ref: 'characters'},
    state: {type: String, enum: ['ALLIANCE', 'ARCHENEMY', 'NEUTRAL']}
});

// Constraint - Unique together - Combination of the two fields
relationshipSchema.index({id0: 1, id1: 1}, {unique: true});

module.exports = mongoose.model('Relationship', relationshipSchema);
