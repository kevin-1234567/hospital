const jwt = require('jsonwebtoken');
const users = require('../model/login');

module.exports = async (req, res, next) => {
  try {
    if (
      req.originalUrl.startsWith('/contact') ||
      req.originalUrl.startsWith('/login')
    )
      return next();
    const token = req.header('Authorization')
      ? req.header('Authorization').replace('Bearer ', '') //checking token
      : null;
    if (!token) {
      return res.json({
        success: false,
        message: 'Unauthorized Access',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.json({
        success: false,
        message: 'Invalid token',
      });
    }

    if (decoded.exp < Date.now()) {
      return res.json({
        success: false,
        message: 'Token expired',
      });
    }
    const isUserExists = await users.findById(decoded.id); //checking user
    if (!isUserExists) {
      return res.json({
        success: false,
        message: 'Access Denied',
      });
    }

    let matchValidity = isUserExists.password
      .concat(isUserExists._id)
      .concat(isUserExists.email); //password
    if (matchValidity != decoded.validity) {
      return res.json({
        success: false,
        message: 'Access Denied',
      });
    }

    req.user = decoded;
    return next();
  } catch (ex) {
    console.log('error', ex);
    res.json({
      success: false,
      message: 'Invalid Token',
    });
  }
};
