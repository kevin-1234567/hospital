require('dotenv').config();
const medicaldetails = require('../../model/medicalDetails');
const alldiseases = require('../../model/diseases');

exports.getmedicaldetails = async (req, res) => {
  try {
    const data = await medicaldetails.find({
      loginId: req.params.id,
    });
    res.send({
      status: true,
      data: data,
    });
  } catch (e) {
    console.log(e.message);
    res.send({
      status: false,
      message: e.message,
    });
  }
};

exports.editmedical = async (req, res) => {
  try {
    if (!req.body.diseaseName) {
      loginid = req.body.loginId;
      const exists = await medicaldetails.findOne({ loginId: loginid });
      if (!exists) {
        const data = await medicaldetails.create({
          loginId: req.body.loginId,
        });
        await medicaldetails.findByIdAndUpdate(data._id, req.body);
      } else {
        const data = await medicaldetails.findOne({ loginId: loginid });
        await medicaldetails.findByIdAndUpdate(data._id, req.body);
      }
      res.send({
        status: true,
        message: 'Updated Successfully',
      });
    } else {
      loginid = req.body.loginId;
      const exists = await medicaldetails.findOne({ loginId: loginid });
      if (!exists) {
        console.log('not entered');
        const data = await medicaldetails.create({
          loginId: req.body.loginId,
        });
        await medicaldetails.findByIdAndUpdate(
          data._id,
          { $push: { diseases: req.body } },
          { new: true }
        );
      } else {
        console.log('else entered');
        const data = await medicaldetails.findOne({ loginId: loginid });
        await medicaldetails.findByIdAndUpdate(
          data._id,
          { $push: { diseases: req.body } },
          { new: true }
        );
      }
    }
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};
exports.getalldiseases = async (req, res) => {
  try {
    const data = await alldiseases.find({});
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
