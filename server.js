'use strict';

console.log('Starting server');

var express  = require('express');
var app      = express();                   // create our app w/ express
var mongoose = require('mongoose');         // mongoose for mongodb
var morgan   = require('morgan');           // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var todoRoute = require('./api/todo/Routes.js');
var publicDir = require('./api/common/publicDir');
var router = express.Router();
var path = require('path');
var credentials = require('./credentials.js');

var mongoUrl = 'mongodb://' + credentials.userName + ':' + 
  credentials.password + '@apollo.modulusmongo.net:27017/' +
  credentials.databaseName;

// connect to mongoDB database on modulus.io or localhost
mongoose.connect(mongoUrl);
//mongoose.connect('mongodb://localhost');


app.use(express.static(__dirname + 'www'));            
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

todoRoute(app);

app.use('/www', function(req,res){
  res.sendFile(path.join(__dirname,req.originalUrl));
});

app.get('/*', function (req, res) {
  res.sendFile(__dirname+'/www/static/ngApp/app.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('listening on', port);
});