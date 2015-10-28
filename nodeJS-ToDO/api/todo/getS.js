'use strict';

var self = getS;
module.exports = self;

var Todo = require('./Model.js');

function getS(req, res) {
  var bag = {};
  bag.who = 'caller:' + '|api|todo|' + self.name;
  console.log('\n Starting', bag.who);

  Todo.find(function (err, todos) {
    if (err) {
      console.error('Error: ', err.errors.text.message);
      res.status(500).send(err.errors.text.message);
    }
    res.json(todos); // return all todos in JSON format
  });
}