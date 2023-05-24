var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.get('/getmedical/:id', controller.getmedicaldetails);
router.patch('/', controller.editmedical);
router.get('/getalldiseases', controller.getalldiseases);

module.exports = router;
