var mongoose = require('mongoose');
var schema = require('./Schema.js');

module.exports = mongoose.model('Todo',schema);