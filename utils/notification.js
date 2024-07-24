const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

module.exports = (contentEmail) => {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );

  transporter.sendMail({
    to: contentEmail.to,
    from: process.env.EMAIL_SENDER,
    subject: contentEmail.subject,
    html: contentEmail.html,
  });
};
