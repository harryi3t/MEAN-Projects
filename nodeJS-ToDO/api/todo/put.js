'use strict';

var async = require('async');

var self = put;
module.exports = self;

var Todo = require('./Model.js');

function put(req, res) {
  var bag = {
    reqBody: req.body,
    resBody: {},
    inputParams: req.params
  };

  bag.updatedTodo = {
    text: bag.reqBody.text,
    status: bag.reqBody.status
  }

  bag.who = 'caller:' + '|api|todo|' + self.name;
  console.log('\nStarting', bag.who);

  async.series([
      _checkInputParams.bind(null, bag),
      _put.bind(null, bag),
      _getS.bind(null, bag)
    ],
    function (err) {
      if (err) {
        console.error('Error: ', err.errors.text.message);
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

  function _put(bag, next) {
    Todo.findOneAndUpdate({
        _id: bag.inputParams.todo_id
      }, {
        $set: bag.updatedTodo
      },
      function (err, todos) {
        if (err)
          return next(err);
        return next();
      }
    );
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