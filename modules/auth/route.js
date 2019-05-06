const express = require('express')
const router = express.Router()

router.post('/', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id_token !== undefined) {
    res.status(422).json({
      errors: 'no token'
    })
  } else {
    res.status(200).json({
      success: 'success'
    })
  }
})

module.exports = router
