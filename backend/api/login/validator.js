const Joi = require('joi');
const moment = require('moment');

const sign = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phoneNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    address: Joi.string().required(),
    aadharNo: Joi.string()
      .length(12)
      .pattern(/^[0-9]+$/)
      .message('Aadhaar number must be a 12-digit numeric value'),
    dob: Joi.string()
      .pattern(/^(\d{4})-(\d{2})-(\d{2})$/)
      .message('Invalid date of birth')
      .custom((value, helpers) => {
        const isValidDate = !isNaN(Date.parse(value));
        if (!isValidDate) {
          return helpers.message(
            'Invalid date format. Please provide the date of birth in the format YYYY-MM-DD'
          );
        }
        const currentDate = new Date();
        const enteredDate = new Date(value);
        if (enteredDate > currentDate) {
          return helpers.message('Date of birth cannot be in the future');
        }
        return value;
      }),
    pinCode: Joi.string()
      .pattern(/^\d{6}$/)
      .message('Invalid PIN code must be atleast 6 digits only')
      .required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .message('Password must be 8 characters long')
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
  });
  // req.body = await schema.validateAsync(req.body);
  // next();
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err.details[0].path[0] === 'phonenumber') {
      res.send({ status: false, message: 'Invalid phone number' });
    } else {
      res.send({ status: false, message: err.message });
    }
  }
};

module.exports = {
  sign,
};
