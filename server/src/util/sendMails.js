import nodemailer from "nodemailer";

export const sendMail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST, 
            port: process.env.SMTP_PORT, 
            service: process.env.SMTP_SERVICE, 
            secure: false, 
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS, 
            },
        });
        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };
        await transporter.sendMail(mailOptions);

    } catch (err) {
        console.log(err)
    }
};