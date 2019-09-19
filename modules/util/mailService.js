import { getServiceError } from './error'
import nodemailer from 'nodemailer'

const SUPPORT_EMAIL = process.env.EMAIL_DEST

const getTransporter = () => {
  return {
    service: process.env.EMAIL_SERVICE,
    // Before sending your email using gmail you have to allow non secure apps to access gmail you can do this by going to your gmail settings here (https://myaccount.google.com/lesssecureapps?pli=1).
    // Otra conf puede ser
    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USR, // generated ethereal user
      pass: process.env.EMAIL_PWD // generated ethereal password
    }
  }
}

const sendMail = async (mailOptions) => {
  console.log(mailOptions)
  let transporter = nodemailer.createTransport(getTransporter())
  return transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return reject(getServiceError(error))
    } else {
      return Promise.resolve(info)
    }
  })
}

module.exports = { sendMail, SUPPORT_EMAIL }
