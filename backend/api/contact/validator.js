const Joi = require('joi');

const contact = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    phonenumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    message: Joi.string().required(),
  });
  // req.body = await schema.validateAsync(req.body);
  // next();
  try {
    req.body = await schema.validateAsync(req.body);
    next();
  } catch (err) {
    if (err.details[0].path[0] === 'phonenumber') {
      res.send({ status: 'failed', message: 'Invalid phone number' });
    } else {
      res.send({ status: 'failed', message: err.message });
    }
  }
};

module.exports = {
  contact,
};
