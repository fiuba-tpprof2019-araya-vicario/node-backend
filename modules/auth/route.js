const express = require('express')
const router = express.Router()
const validation = require('./validation')
const controller = require('./controller')
const { validate, validateWithExpress } = require('../util/requestValidator')

router.post('/', validation.authValidations, validateWithExpress, validate(controller.auth))

module.exports = router
