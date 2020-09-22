const { Router } = require("express");
const {index,uploadFile,showFile}= require('../controllers/controller')
const router=Router();

router.get('/audio', index);
router.get('/audio/:id',showFile);
router.post('/audio/upload/',uploadFile);

module.exports = router;
