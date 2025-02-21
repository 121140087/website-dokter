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

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_DOMAIN}/verify-email/${token}`;
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_FROM, // sender address
      to: email, // list of receivers
      subject: `Verify your email`, // Subject line
      html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`, // html body
    });
  } catch (err) {
    console.log(err);
  }
};
