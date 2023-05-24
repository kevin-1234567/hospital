var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.get('/getvaccines', controller.getvaccines);
router.post('/vaccinesubmit', controller.vaccinesubmit);
router.post('/allvaccinations', controller.allvaccinations);
router.get('/allfeedbacks', controller.allfeedbacks);

module.exports = router;
