const nodemailer = require('nodemailer');

function sendEmail({ email, title, start, end, displayName }) {

    return new Promise((resolve, reject) => {
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "bruinsonboard@gmail.com",
          pass: "uvnl klre jebe tmlh",
        },
      });
  
      const mail_configs = {
        from: "bruinsonboard@gmail.com",
        to: email,
        subject: "BruinsOnBoard: Ride confirmation",
        html: 
          '<div style="font-family: Arial, sans-serif; color: #333;">' +
            '<h1 style="color: #0055a5;">You have joined a ride!</h1>' +
            '<p>Ride Group Details:</p>' +
            '<ul>' +
              '<li><strong>Title:</strong>' + title + '</li>' +
              '<li><strong>Start:</strong>' +  start + ' ' + '</li>' +
              '<li><strong>End:</strong>' +  end + ' ' + '</li>' +
              '<li><strong>Group Members:</strong></li>' + displayName + ' ' +
            '</ul>' +
            '<p>Thank you for using our service. We hope you enjoy your ride!</p>' +
          '</div>'
      };

      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          console.log(error);
          return reject({ message: `An error has occurred` });
        }
        return resolve({ message: "Email sent successfully" });
      });
    }); 
}
module.exports = sendEmail;