import { getServiceError } from '../util/error'
import nodemailer from 'nodemailer'

const SUBJECT = 'Nuevo requerimiento cargado de'

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

const getMailOptions = (email, name, description) => {
  let body = ''
  body += `Requerimiento cargado por: <b>${name}</b>`
  body += '<br>'
  body += '<br>'
  body += description
  body += '<br>'

  const mailOptions = {
    from: email, // sender address
    to: process.env.EMAIL, // receiver email
    subject: `${SUBJECT} ${name}`, // Subject line
    html: body // plain text body
  }

  return mailOptions
}

const sendMail = async (email, name, description) => {
  return new Promise(async (resolve, reject) => {
    let transporter = nodemailer.createTransport(getTransporter())
    let mailOptions = getMailOptions(email, name, description)
    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(getServiceError(error))
      } else {
        return resolve(info)
      }
    })
  })
}

module.exports = { sendMail }
