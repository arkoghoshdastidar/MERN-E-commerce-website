const nodemailer = require('nodemailer');

const sendEmail = async function (email, link) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.mail.yahoo.com',
        port: 465,
        service: 'yahoo',
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        },
        debug: false,
        logger: true
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