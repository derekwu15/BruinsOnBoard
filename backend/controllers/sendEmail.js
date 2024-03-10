const nodemailer = require('nodemailer');

function sendEmail({ email}) {
    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "tiffanylin3000@gmail.com",
          pass: "lmqx swqi wqup wegc",
        },
      });

      const mail_configs = {
        from: "tiffanylin3000@gmail.com",
        to: email,
        subject: "Ride confirmation",
        text: "You have joined a ride!",
      };
      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          console.log(error);
          return reject({ message: 'An error has occurred' });
        }
        return resolve({ message: "Email sent successfully" });
      });
    }); 
}
module.exports = sendEmail;