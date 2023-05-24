require('dotenv').config();
const vacc = require('../../model/vaccine');
const vaccine = require('../../model/vaccination');
const transaction = require('../../model/transaction');
const hospital = require('../../model/hospital');
const feedbacks = require('../../model/contact');

exports.getvaccines = async (req, res) => {
  try {
    const data = await vacc.find({});
    res.send({
      status: true,
      data: data,
    });
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};
exports.vaccinesubmit = async (req, res) => {
  try {
    console.log(req.body);
    let transactionDetails = new transaction({
      amount: '0.001',
      status: req.body.metamaskresult.status,
      appointmentType: 'vaccination',
      transactionHash: req.body.metamaskresult.transactionHash,
      loginId: req.body.loginId,
    });
    const trans = await transaction.create(transactionDetails);
    console.log('transaction', trans._id);
    const vaccname = await vacc.findOne({
      _id: req.body.vaccineId,
    });
    const hospname = await hospital.findOne({
      hospitalId: req.body.hospitalId,
    });
    await vaccine.create({
      date: req.body.date,
      disease: req.body.disease,
      antigen: req.body.antigen,
      vaccineId: vaccname.name,
      hospitalId: hospname.hospitalName,
      time: req.body.time,
      loginId: req.body.loginId,
      transactionId: trans._id,
    });
    res.send({
      status: true,
      message: 'Transaction Complete',
    });
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};

exports.allvaccinations = async (req, res) => {
  try {
    const data = await vaccine.find({ loginId: req.body.login });
    res.send({
      status: true,
      data: data,
    });
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};
exports.allfeedbacks = async (req, res) => {
  try {
    const data = await feedbacks.find({});
    console.log(data);
    res.send({
      status: true,
      data: data,
    });
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};
