var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.get('/tranhistory', controller.transactionhistory);

module.exports = router;
