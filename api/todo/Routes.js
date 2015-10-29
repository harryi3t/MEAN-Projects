'use strict';

var self = todoRoute;
module.exports = self;

function todoRoute(app){
  console.log('Inside |api|todo|Routes');

  app.get('/api/todos', require('./getS.js'));
  app.post('/api/todos', require('./post.js'));
  app.put('/api/todos/:todo_id', require('./put.js'));
  app.delete('/api/todos/:todo_id', require('./deleteById.js'));
}