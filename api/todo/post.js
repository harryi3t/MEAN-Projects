'use strict';

var async = require('async');

var self = post;
module.exports = self;

var Todo = require('./Model.js');

function post(req, res) {
  var bag = {
    reqBody: req.body,
    resBody: {}
  };

  bag.who = 'caller:' + '|api|todo|' + self.name;
  console.log('\nStarting', bag.who);

  async.series([
      _checkInputParams.bind(null, bag),
      _post.bind(null, bag),
      _getS.bind(null, bag)
    ],
    function (err) {
      if (err) {
        console.error('Error: ', err.errors.text.message);
        res.status(500).send(err.errors.text.message);
      } else
        res.json(bag.resBody);
    }
  );

  function _checkInputParams(bag, next) {
    var who = bag.who + '|' + _checkInputParams.name;
    console.log('Inside', who);

    if (!bag.reqBody)
      throw 'request body missing';
    console.error('reqBody', bag.reqBody);

    return next();
  }

  function _post(bag, next) {
    var who = bag.who + '|' + _post.name;
    console.log('Inside', who);

    Todo.create({
      text: req.body.text,
      status: req.body.status
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