require('dotenv').config();
const login = require('../../model/login');
const signup = require('../../model/signup');
const passwordHashing = require('../../module/passwordHash');
const medicaldetails = require('../../model/medicalDetails');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await login.findOne({ email });
    if (!users)
      return res.json({
        success: false,
        message: 'invalid username or password',
      });
    if (!(await login.verifyPassword(password, users.password, users.salt)))
      return res.json({
        success: false,
        message: 'invalid password',
      });
    const accessToken = await login.generateAuthTocken(users);
    const refreshToken = await login.generateAuthTocken(users);
    const role = await signup.findOne({ loginId: users._id });
    return res.send({
      success: true,
      message: 'Login successfully',
      data: {
        role: role.role,
        id: role._id,
        login: role.loginId,
        accessToken,
        refreshToken,
      },
    });
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await login.findOne({ email });
    if (users)
      return res.json({
        status: false,
        message: 'Email already existing',
      });
    const aadharuser = await signup.findOne({ aadharNo: req.body.aadharNo });
    if (aadharuser)
      return res.json({
        status: false,
        message: 'Aadhar Number already existing',
      });
    let { salt, newPassword } = await passwordHashing(req.body.password);
    const loginData = await login.create({
      email: req.body.email,
      password: newPassword,
      salt: salt,
    });
    await signup.create({
      name: req.body.name,
      phoneNumber: req.body.phoneNumber,
      role: 'Patient',
      address: req.body.address,
      aadharNo: req.body.aadharNo,
      pinCode: req.body.pinCode,
      country: req.body.country,
      dob: req.body.dob,
      state: req.body.state,
      loginId: loginData.id,
    });
    res.send({
      status: true,
      message: 'Signed up Successfully login in with your email and password',
    });
  } catch (e) {
    res.send({
      status: false,
      message: e.message,
    });
  }
};
exports.getallsignup = async (req, res) => {
  try {
    console.log(req.params.id);
    const data = await signup.findOne({ loginId: req.params.id });
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
