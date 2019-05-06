const express = require('express')
const router = express.Router()
const validation = require('./validation')
const { validate, validateWithExpress } = require('../util/requestValidator')

router.post('/', validation.authValidations, validateWithExpress, function (req, res, next) {
  let body = req.body
  if (body.id_token !== undefined) {
    res.status(200).json({
      success: 'success'
    })
  } else {
    res.status(200).json({
      errors: 'no token'
    })
  }
})

module.exports = router
