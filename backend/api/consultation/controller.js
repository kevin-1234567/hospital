require('dotenv').config();
const hospital = require('../../model/hospital');
const department = require('../../model/department');
const doctor = require('../../model/doctor');
const transaction = require('../../model/transaction');
const consultation = require('../../model/consultation');

exports.hospital = async (req, res) => {
  try {
    const data = await hospital.find({});
    const dept = await department.find({});
    res.send({
      status: true,
      data: data,
      data2: dept,
    });
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};
exports.finddata = async (req, res) => {
  try {
    console.log(req.body.departmentid);
    const doctors = await doctor.find({
      hospitalId: req.body.hospitalid,
      departmentId: req.body.deparmentid,
    });
    res.send({
      status: true,
      data: doctors,
    });
  } catch (e) {
    console.log(e.message);
    res.send({
      status: false,
      message: e.message,
    });
  }
};

exports.consultationsubmit = async (req, res) => {
  try {
    console.log(req.body);
    let transactionDetails = new transaction({
      amount: '0.001',
      status: req.body.metamaskresult.status,
      appointmentType: 'consultation',
      transactionHash: req.body.metamaskresult.transactionHash,
      loginId: req.body.loginId,
    });
    const hospname = await hospital.findOne({
      hospitalId: req.body.hospitalId,
    });
    const deptname = await department.findOne({
      departmentId: req.body.departmentId,
    });
    const docname = await doctor.findOne({
      _id: req.body.doctorId,
    });
    const trans = await transaction.create(transactionDetails);
    console.log('transaction', trans._id);
    await consultation.create({
      time: req.body.date,
      hospitalId: hospname.hospitalName,
      departmentId: deptname.departmentName,
      doctorId: docname.doctorName,
      loginId: req.body.loginId,
      transactionId: trans._id,
      date: req.body.times,
    });
    res.send({
      status: true,
      message: 'Transaction Complete',
    });
  } catch (e) {
    console.log(e.message);
    res.send({
      status: false,
      message: e.message,
    });
  }
};
exports.allconsultations = async (req, res) => {
  try {
    const data = await consultation.find({ loginId: req.body.login });
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
