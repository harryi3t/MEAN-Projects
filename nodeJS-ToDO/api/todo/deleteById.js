'use strict';

var async = require('async');

var self = deleteById;
module.exports = self;

var Todo = require('./Model.js');

function deleteById(req, res) {
  var bag = {
    reqBody: req.body,
    resBody: {},
    inputParams: req.params
  };

  bag.who = 'caller:' + '|api|todo|' + self.name;
  console.log('\nStarting', bag.who);

  async.series([
      _checkInputParams.bind(null, bag),
      _delete.bind(null, bag),
      _getS.bind(null, bag)
    ],
    function (err) {
      if (err){
        console.error('Error: ',err.errors.text.message);
        res.status(500).send(err.errors.text.message);
      }
      res.json(bag.resBody);
    }
  );

  function _checkInputParams(bag, next) {
    var who = bag.who + '|' + _checkInputParams.name;
    console.log('Inside', who);

    if (!bag.reqBody)
      throw 'request body missing';
    return next();
  }

  function _delete(bag, next) {
    Todo.remove({
      _id: bag.inputParams.todo_id
    }, function (err, todo) {
      if (err)
        return next(err);
      return next();
    });
  }

  function _getS(bag, next) {
    var who = bag.who + '|' + _getS.name;
    console.log('Inside', who);

    Todo.find(function (err, todos) {
      if (err)
        return next(err);
      bag.resBody = todos;
      return next();
    });
  }
}