import express from 'express'
import logger from 'morgan'
import { json, urlencoded } from 'body-parser'
import { connect } from './db/connectorDB'
import authRoute from './modules/auth/authRoute'

import userRoute from './modules/user/userRoute'
import contactRoute from './modules/contact/contactRoute'
import projectRoute from './modules/project/projectRoute'
import requestRoute from './modules/request/requestRoute'
import requirementRoute from './modules/requirement/requirementRoute'
import careerRoute from './modules/career/careerRoute'
import profileRoute from './modules/profile/profileRoute'

const app = express()

connect()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept')
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
  next()
})

if (process.env.PRODUCTION_LOG) {
  const fs = require('fs')
  const path = require('path')
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
  // setup the logger
  app.use(logger('combined', { stream: accessLogStream }))
} else {
  app.use(logger('dev'))
}

app.use(json({ limit: '50mb' }))
app.use(urlencoded({ limit: '50mb', extended: true }))

app.get('/', function (req, res, next) {
  res.status(200).send('Hello World')
})
app.use('/v0/api/auth', authRoute)
app.use('/v0/api/users', userRoute)
app.use('/v0/api/projects', projectRoute)
app.use('/v0/api/requests', requestRoute)
app.use('/v0/api/requirements', requirementRoute)
app.use('/v0/api/careers', careerRoute)
app.use('/v0/api/profiles', profileRoute)
app.use('/v0/api/contacts', contactRoute)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req
    .app
    .get('env') === 'development'
    ? err
    : {}
  // send an error message
  res
    .status(err.status || 500)
    .send(err)
})

export default app
