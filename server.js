// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express     = require('express');        // call express
var app         = express();                 // define our app using express
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var path        = require('path');
var db          = require('./dbconfig');


db.connect(db.mongodbUri, db.options);


app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(bodyParser.json());  // to support JSON-encoded bodies
app.use(express.static('app'));
app.use(express.static('assets'));
app.use(express.static('archives'));
app.use(require('./controllers'));


// START THE SERVER
// =============================================================================
var port = process.env.PORT || 80;        // set our port
app.listen(port);
console.log('Server listening on port: ' + port);