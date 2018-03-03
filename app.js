var express = require('express');
var app = express();
var db = require('./db');
var bodyParser  = require('body-parser');
global.__root   = __dirname + '/'; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var AuthController = require(__root + 'app/auth/AuthController');
app.use('/api/auth', AuthController);

var CRUDController = require(__root + 'app/crud/CRUDController');
app.use('/api/bears', CRUDController);

module.exports = app;
