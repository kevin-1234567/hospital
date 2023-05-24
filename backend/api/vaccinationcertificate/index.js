var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.post(
  '/issuevaccinationcertificate',
  controller.issuevaccinationcertificate
);

module.exports = router;
