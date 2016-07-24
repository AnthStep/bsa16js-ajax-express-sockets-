var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var socketio = require('socket.io');

var app = express();
var server = app.listen(1234);


var staticDir = path.normalize(__dirname + '/../public/');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(staticDir));

var routes = require('./routes/routes')(app);
var io = require('./socket')(socketio.listen(server));






