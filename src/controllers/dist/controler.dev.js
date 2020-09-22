"use strict";

var nodemon = require("nodemon");

var multer = require('multer');

var _require = require('../database'),
    getConnection = _require.getConnection;

var _require2 = require('mongodb'),
    GridFSBucket = _require2.GridFSBucket;

var _require3 = require('stream'),
    Readable = _require3.Readable;

index = function index(req, res) {
  res.send('indexWorks');
};

uploadFile = function uploadFile(req, res) {
  //use multer to manage audiofile
  var upload = multer({
    storage: multer.memoryStorage(),
    //storage in a buffer
    limits: {
      fields: 1,
      //fields
      fileSize: 6000000,
      //6mb
      files: 1,
      //1 file per upload
      parts: 2 //info type(file and methadata)

    }
  });
  upload.single('audio_file'
  /*key*/
  )(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        message: err.message
      });
    } else if (!req.body.audiofilename) {
      return res.status(400).json({
        message: "no filename in request body"
      });
    }
  });
  var audiofilename = req.body.audiofilename; // convert buffer to readable stream
  //use readable

  var readAudioStream = new Readable();
  readAudioStream.push(req.file.buffer);
  readAudioStream.push(null); //   let flie=req.file;

  var db = getConnection();
  var bucket = new GridFSBucket(db, {
    bucketName: archivosAudio
  });
  var uploadstream = bucket.openUploadStream(audiofilename); //upload file througth buffer(stream buffer)

  var id = uploadstream.id;
  readAudioStream.pipe(uploadstream);
  uploadStream.on('error', function () {
    return res.status(500).json({
      message: "Error uploading file"
    });
  });
  uploadStream.on('finish', function () {
    return res.status(201).json({
      message: "File uploaded successfully, stored under Mongo ObjectID: " + id
    });
  });
};

showFile = function showFile(req, res) {
  res.send('upladed ok');
};

module.exports = {
  index: index,
  uploadFile: uploadFile,
  showFile: showFile
};