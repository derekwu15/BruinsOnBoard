const nodemailer = require('nodemailer');

function sendEmail({ email }) {
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
        subject: "BruinsOnBoard: Ride confirmation",
        html:
          <div style="font-family: Arial, sans-serif; color: #333;">
              <h1 style="color: #0055a5;">You have joined a ride!</h1>
              <p>Ride Group Details:</p>
              <ul>
                  <li><strong>Time:</strong> ${rideTime}</li>
                  <li><strong>Location:</strong> ${rideLocation}</li>
                  <li><strong>Group Members:</strong></li>
                  <ul>
                      ${groupMembers.map(member => `<li>${member.name} (${member.email})</li>`).join('')}
                  </ul>
              </ul>
              <p>Thank you for using our service. We hope you enjoy your ride!</p>
          </div>
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