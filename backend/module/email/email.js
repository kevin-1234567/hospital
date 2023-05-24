require('dotenv').config();
var fs = require('fs');
var nodemailer = require('nodemailer');
var ejs = require('ejs');

module.exports = {
  templatemail: async (x = req.body) => {
    var transporter = nodemailer.createTransport({
      service: process.env.service,
      auth: {
        user: process.env.from,
        pass: process.env.pass,
      },
    });

    ejs.renderFile(
      __dirname + '/index.ejs',
      { name: x.name },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var mainOptions = {
            from: process.env.from,
            to: x.email,
            subject: 'Health Track Enquiry',
            html: data,
          };
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log('Message sent: ' + info.response);
            }
          });
        }
      }
    );
  },
};
