"use strict";

var _require = require('mongodb'),
    MongoClient = _require.MongoClient;

var db;
MongoClient.connect('mongodb+srv://audioUser:audioUser@cluster0.fangg.mongodb.net/test?retryWrites=true&w=majority', {
  useUnifiedTopology: true
}, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(0);
  }

  console.log("db conected");
  db = client.db('audio');
});

var getConnection = function getConnection() {
  return db;
};

module.exports = {
  getConnection: getConnection
};