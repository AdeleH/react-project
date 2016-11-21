var mongoose = require('mongoose');
var autoincrement = require('mongoose-autoincrement-id');
mongoose.plugin(autoincrement);

var characterSchema = new mongoose.Schema({
    _id: { type: String, unique: true, index: true }, // autoincrement
    name: String
});

module.exports = mongoose.model('Character', characterSchema);
