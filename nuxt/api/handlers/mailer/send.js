import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

function sendMail(formData, host) {
  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_AUTH_USER,
      pass: process.env.NODEMAILER_AUTH_PASS,
    },
  })

  const message = `${formData.body}\n\nThis message was sent from ${host}`

  let mailOptions = {
    from: `${formData.name} <${formData.email}>`,
    to: process.env.NODEMAILER_DEFAULT_RECIEVER,
    subject: formData.subject,
    text: message,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) reject(error)
      else resolve(info)
    })
  })
}

export default (req, res) => {
  if (!req.body.name || !req.body.subject || !req.body.body) {
    res.status(400)
    res.end()
  }

  sendMail(req.body, req.headers.host)
    .then((info) => {
      res.status(200)
      res.send(info)
    })
    .catch((error) => {
      console.error(error)
      res.status(400)
      res.send(error)
    })
}
