import { validationResult } from 'express-validator'
import { createErrorResponse, codes } from './responser'
import { getExpressError } from './error'

// Usada como wrapper para el manejo de errores basicos de un request
// asyncronico
const validate = function (handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (e) {
      console.log('Error ', e)
      if (e.status === undefined) {
        e.status = 500
        e.msg = 'Server Internal Error'
      }
      console.log('Error in request validator: ', e)
      res.statusCode = e.status
      res.json(createErrorResponse(e.status, e.msg, null))
    }
  }
}

/* Se debe utilizar como middleware en caso de que la ruta tenga validaciones con express-validator
*/
const validateWithExpress = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log('Error in validateWithExpress validator: ', errors.mapped())
    console.log(errors.mapped()._error.nestedErrors[0])
    return res
      .status(codes.UNPROCESSABLE_ENTITY)
      .json(createErrorResponse(codes.UNPROCESSABLE_ENTITY, getExpressError(errors.mapped()._error.nestedErrors[0]), null))
  }
  next()
}

module.exports = {
  validate,
  validateWithExpress
}
