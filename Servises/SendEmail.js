import  nodemailer from "nodemailer";

async function sendEmail(to, subject, html){
const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.SENDEMAIL,
      pass:  process.env.SENDPASSWORD
    }
  });
    const info = await transporter.sendMail({
      from: '"NADA OBAID 👻" <nada.s.obaidd@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      html // html body
    })};

    export default sendEmail;