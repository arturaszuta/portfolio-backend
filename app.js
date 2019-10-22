require('dotenv').config()
const express = require("express")
const app = express();
const nodemailer = require('nodemailer');
const util = require("util")

var bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use( bodyParser.urlencoded({ extended: true }));

async function main(name, email, message) {

  let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: process.env.user, 
          pass: process.env.password
      }
  });

  let info = await transporter.sendMail({
      from: '"Portoflio Website" <nodemaileraz@gmail.com>',
      to: 'arturaszuta@gmail.com', 
      subject: "You've a new message from your portfolio site!", 
      text: 'Hello world?', 
      html: `<b>Name:</b><br>${name}<br><b>Email:</b><br>${email}<br><b>Message:</b><br>${message}`
  });
}

app.post("/sendform", (req, res) => {
 
  const { name, email, message } = req.query;
  main(name, email, message);
  res.send("Success!");
})

app.listen(process.env.PORT || 3005, () => {
  console.log('server is live bitches!')
})