const express = require('express')
const router = express.Router()

router.post('/', function (req, res, next) {
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
