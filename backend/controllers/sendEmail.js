const nodemailer = require('nodemailer');

function sendEmail({ email, title, start, end, displayName }) {

  const date = start.split('T')[0];
  const start1 = start.split('T')[1].split('.')[0];
  const end1 = end.split('T')[1].split('.')[0];

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
      subject: "BruinsOnBoard: Ride information",
      html: 
      '<div style="font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">' +
      '<div style="background-color: #0055a5; color: white; text-align: center; padding: 10px 0; font-size: 24px; font-weight: bold; border-radius: 8px 8px 0 0;">BruinsOnBoard</div>' +
      '<h1 style="color: #0055a5; text-align: center;">Your ride has been updated!</h1>' +
      '<h2 style="color: #333;">Ride Group Details:</h2>' +
      '<hr style="border: 0; height: 2px; background-color: #d3d3d3; margin-bottom: 20px;">' + 
      '<table style="width: 100%;;"><strong>From:</strong></td><td>' + title + '</td></tr>' +
      '<tr><td style="color: #333;"><strong>Date:</strong></td><td>' + date + '</td></tr>' +
      '<tr><td style="color: #333;"><strong>Start:</strong></td><td>' + start1 + '</td></tr>' +
      '<tr><td style="color: #333;"><strong>End:</strong></td><td>' + end1 + '</td></tr>' +
      '<tr><td style="color: #333; vertical-align: top;"><strong>Group Members:</strong></td><td>' + displayName + '</td></tr>' +
      '</table>' +
      '<p style="text-align: center; margin-top: 20px;">Thank you for using our service. <br />We hope you enjoy your ride!</p>' +
      '<p style="text-align: center; color: #333; margin-top: 10px;">Get in touch with us at <a href="mailto:bruinsonboard@gmail.com" style="color: #0055a5;">bruinsonboard@gmail.com</a> for any questions or support.</p>' +
      '<div style="background-color: #0055a5; color: white; text-align: center; padding: 10px 0; margin-top: 20px; font-size: 18px; font-weight: bold; border-radius: 0 0 8px 8px;">Sharing Journeys, Splitting Costs, Building Connections</div>' +
      '</div>'
        
    };

    transporter.sendMail(mail_configs, function(error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  });
}
module.exports = sendEmail;
