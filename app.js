import express from 'express'
import logger from 'morgan'
import { json, urlencoded } from 'body-parser'
import ConnectorDB from './db/connectorDB'
import authRoute from './modules/auth/route'

const app = express()

ConnectorDB.connect()

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

app.use(json())
app.use(urlencoded({ extended: false }))

app.get('/', function (req, res, next) {
  res.status(200).send('Hello World')
})
app.use('/v0/api/auth', authRoute)

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
