require('dotenv').config();
const login = require('../../model/login');
const signup = require('../../model/signup');

exports.profile = async (req, res) => {
  try {
    const data = await signup.findOne({ _id: req.body.id });
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
