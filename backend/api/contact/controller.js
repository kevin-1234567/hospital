require('dotenv').config();
const contact = require('../../model/contact');
const mode = require('../../module/email/email');

exports.contactus = async (req, res) => {
  try {
    const data = await contact.create({
      name: req.body.name,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      message: req.body.message,
    });
    await mode.templatemail(req.body);
    return res.send({
      success: true,
      message: 'Our representative will contact you shortly',
    });
  } catch (e) {
    return res.send({
      success: false,
      message: e.message,
    });
  }
};
