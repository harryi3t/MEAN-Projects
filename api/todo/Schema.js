'use strict';

var mongoose = require('mongoose'); 

module.exports = mongoose.Schema({
  text: { type: String, required: true },
  status: {type:String, enum:['pending','done'], default:'pending'}
});