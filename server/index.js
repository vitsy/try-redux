"use script";
const path = require('path');
const settings = require('./settings.js');
const log = settings.log;
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server, {});
const socketIO = require('./socketIO.js')(io);
const static_path = path.join(__dirname, './../build');
app.enable('trust proxy');
app.get('/',function(req, res) {
  res.header('Cache-Control', "max-age=60, must-revalidate, private");
  res.sendFile('index.html', {
    root: static_path
  });
});

server.listen(settings.port, function () {

  console.log('Listening at port ', settings.port);

});

