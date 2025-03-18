"use server";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GMAIL_FROM,
    pass: process.env.GMAIL_APPLICATION_PASSWORD,
  },
});


export const sendResetPasswordEmail = async (email:string,token:string) => {
    const link = `${process.env.NEXT_PUBLIC_DOMAIN}/change-password/${token}`;
    try {
      await transporter.sendMail({
        from: process.env.GMAIL_FROM, // sender address
        to: email, // list of receivers
        subject: `Reset Password`, // Subject line
        html: `<p>Click <a href="${link}">here</a> to change your password.</p>`, // html body
      });
    } catch (err) {
      console.log(err);
    }
}