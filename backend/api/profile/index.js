var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.post('/', controller.profile);

module.exports = router;
