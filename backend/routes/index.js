var express = require('express');
var router = express.Router();

router.use('/contact', require('../api/contact/index'));
router.use('/login', require('../api/login/index'));
router.use('/profile', require('../api/profile/index'));
router.use('/medical', require('../api/medicaldetails/index'));
router.use('/consultation', require('../api/consultation/index'));
router.use('/vaccination', require('../api/vaccination/index'));
router.use(
  '/consultationcertificate',
  require('../api/consultationcertificate/index')
);

router.use('/patientcounter', require('../api/patientcounter/index'));

router.use('/transaction', require('../api/transaction/index'));
router.use(
  '/vaccinationcertificate',
  require('../api/vaccinationcertificate/index')
);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
