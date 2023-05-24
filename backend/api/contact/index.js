var express = require('express');
var router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post('/', validator.contact, controller.contactus);
module.exports = router;
