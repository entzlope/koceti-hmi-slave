// Web Server handler
const express = require('express');

var app = express();
var server = null;

var start = function(port) {
  app.use(express.static(__dirname + '/html'));
  server = app.listen(port);
  console.log(`HTTP server listening on port ${port}`);
}

var stop = function() {
  if(!server) server.close();
}

module.exports.start = start;
module.exports.stop = stop;
