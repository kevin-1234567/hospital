var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.get('/getconsultation', controller.getconsultation);
router.get('/getvaccination', controller.getvaccination);
router.post(
  '/issueconsultationcertificate',
  controller.issueconsultationcertificate
);

module.exports = router;
