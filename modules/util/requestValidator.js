import { validationResult } from 'express-validator'
import { createErrorResponse, codes } from './responser'

// Usada como wrapper para el manejo de errores basicos de un request
// asyncronico
const validate = function (handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (e) {
      if (e.status === undefined) {
        console.error('Internal error: ', e)
        e.status = 500
        e.msg = 'Hubo un error en el servidor. Intente más tarde nuevamente.'
      }else{
        console.error('Bussiness error: ', e)
      }
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
      .json(createErrorResponse(codes.UNPROCESSABLE_ENTITY, errors.mapped()._error.nestedErrors[0].msg, null))
  }
  next()
}

module.exports = {
  validate,
  validateWithExpress
}
