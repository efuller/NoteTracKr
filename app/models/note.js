var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    note: String
});

module.exports = mongoose.model('Note', NoteSchema );