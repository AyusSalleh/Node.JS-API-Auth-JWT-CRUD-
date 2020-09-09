var express = require('express');
var app = express();
var db = require('./db');
var bodyParser  = require('body-parser');
var multer = require('multer');
var upload = multer();

global.__root   = __dirname + '/'; 

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

var AuthController = require(__root + 'app/auth/AuthController');
app.use('/api/auth', AuthController);

var CRUDController = require(__root + 'app/crud/CRUDController');
app.use('/api/bears', CRUDController);

var NotificationController = require(__root + 'app/notification/NotificationController');
app.use('/api/notification', NotificationController);

module.exports = app;
