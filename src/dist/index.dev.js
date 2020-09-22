"use strict";

var express = require('express');

var morgan = require('morgan');

var cors = require('cors');

var os = require("os");

var app = express(); //instance express

var testPort = 3000; //test port 

var rutasaudio = require('./routes/audio.routes');

app.set('port', process.env.PORT || testPort); //middlewares

app.use(cors());
app.use(morgan('dev')); //routes

app.use(rutasaudio); //up

app.listen(app.get('port'), function () {
  //console.dir(os.networkInterfaces());
  console.log("server up and ready for listen at port " + app.get('port'));
}); //indicate the port to listen, callback funtion allows know that the server is up