require('dotenv').config();
const consultation = require('../../model/consultation');
const vaccination = require('../../model/vaccination');
const transaction = require('../../model/transaction');

exports.patientcounter = async (req, res) => {
  try {
    console.log('****', req.body);
    const cosulcount = await consultation.countDocuments({
      loginId: req.body.loginId,
    });
    const vaccinecount = await vaccination.countDocuments({
      loginId: req.body.loginId,
    });
    const amount = await transaction.find({
      loginId: req.body.loginId,
    });

    const totalAmount = amount.reduce(
      (acc, obj) => acc + parseFloat(obj.amount),
      0
    );
    res.send({
      status: true,
      data: cosulcount,
      data2: vaccinecount,
      data3: totalAmount,
    });
  } catch (e) {
    console.log(e.message);
    res.send({
      status: false,
      message: e.message,
    });
  }
};
