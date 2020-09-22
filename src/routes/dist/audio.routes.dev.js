"use strict";

var _require = require("express"),
    Router = _require.Router;

var _require2 = require('../controllers/controller'),
    index = _require2.index,
    uploadFile = _require2.uploadFile,
    showFile = _require2.showFile;

var router = Router();
router.get('/audio', index);
router.get('/audio/:id', showFile);
router.post('/audio/upload/', uploadFile);
module.exports = router;