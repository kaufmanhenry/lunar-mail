const nodemailer = require('nodemailer');

// Pull data from the process.env
const { MAILING_DISABLED, SMTP_HOST, PORT, AUTH_USER, AUTH_PASS, FROM_USER } = process.env;

// All of these parameters are required in order to send an email
if (!MAILING_DISABLED) {
  if (!SMTP_HOST) console.error('An SMTP_HOST is required in order to send email');
  if (!AUTH_USER) console.error('An AUTH_USER is required in order to send email');
  if (!AUTH_PASS) console.error('An AUTH_PASS is required in order to send email');
  if (!FROM_USER) console.error('A FROM_USER is required in order to send email');
}

module.exports = () => {
  // Configure the nodemailer transportation
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: PORT || 465,
    secure: true,
    auth: {
      user: AUTH_USER,
      pass: AUTH_PASS
    }
  });

  // sends an email with a provided from, to, subject, body
  const sendEmail = (to, subject, body) =>
    new Promise((resolve, reject) => {
      // If mailing is disabled, just console the mailing info
      if (MAILING_DISABLED) {
        console.info(`Sending an email with the subject of ${subject} to ${to} from ${FROM_USER}`);
        console.info('---');
        console.info(`Email content: \n ${body}`);
        return resolve();
      }
      // Configure the email to send
      const mailConfig = {
        from: FROM_USER,
        to,
        subject,
        html: body
      };
      // Send the email
      return transporter.sendMail(mailConfig, (err) => {
        if (err) return reject(err);

        return resolve({
          message: 'Successfuly sent an email',
          status: 200
        });
      });
    });

  return sendEmail;
};
