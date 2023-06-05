const nodemailer = require('nodemailer');

const sendEmail = async function (email, link) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    });

    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: email,
        text: 'Change the password by clicking on the below link \n\n' + link,
        subject: 'E-commerce password change requested.'
    };

    transporter.sendMail(mailOptions, function (err, result) {
        if (err) {
            throw new Error(err);
        } else {
            return result;
        }
    });
}

module.exports = sendEmail;