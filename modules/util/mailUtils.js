const contactHtml = (name, email, description) => {
  let body = ''
  body += `Requerimiento cargado por: <b>${name}</b>`
  body += '<br>'
  body += `Mail de contacto: <b>${email}</b>`
  body += '<br>'
  body += '<br>'
  body += description
  body += '<br>'
  return body
}

const contactSubject = (name) => {
  return `Nuevo requerimiento cargado por ${name}`
}

export const getContactMailOption = (data) => {
  return {
    sender: data.email,
    to: process.env.EMAIL_DEST,
    subject: contactSubject(data.name),
    html: contactHtml(data.name, data.email, data.description)
  }
}

const requestHtml = (name, type, path) => {
  let body = ''
  body += `Has sido invitado a participar como ${type} del proyecto <b>${name}</b>.`
  body += '<br>'
  body += '<br>'
  body += `Ingrese a la aplicación para visualizarla haciendo <a href=${process.env.URL_FRONTEND_HOME}/${path} target="_blank"> Click aquí </a>`
  return body
}

const requestSubject = (name) => {
  return `Nueva solicitud de participación al proyecto ${name}`
}

export const getRequestStudentMailOption = (data) => {
  return {
    sender: process.env.EMAIL_DEST,
    to: data.to,
    subject: requestSubject(data.name),
    html: requestHtml(data.name, 'coautor', 'my_projects')
  }
}

export const getRequestTutorMailOption = (data) => {
  return {
    sender: process.env.EMAIL_DEST,
    to: data.to,
    subject: requestSubject(data.name),
    html: requestHtml(data.name, 'tutor', 'my_tutorials')
  }
}

export const getRequestCotutorMailOption = (data) => {
  return {
    sender: process.env.EMAIL_DEST,
    to: data.to,
    subject: requestSubject(data.name),
    html: requestHtml(data.name, 'cotutor', 'my_tutorials')
  }
}
