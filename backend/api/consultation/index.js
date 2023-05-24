var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.get('/hospital', controller.hospital);
router.post('/finddata', controller.finddata);
router.post('/consultationsubmit', controller.consultationsubmit);
router.post('/allconsultations', controller.allconsultations);

module.exports = router;
