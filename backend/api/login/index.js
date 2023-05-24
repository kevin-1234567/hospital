var express = require('express');
var router = express.Router();
const controller = require('./controller');
const validator = require('./validator');

router.post('/', controller.login);
router.post('/signup', validator.sign, controller.signup);
router.get('/getallsignup/:id', controller.getallsignup);

module.exports = router;
