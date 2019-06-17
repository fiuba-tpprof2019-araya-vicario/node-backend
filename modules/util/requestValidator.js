import { validationResult } from 'express-validator/check'
import { createErrorResponse, codes } from './responser'

// Usada como wrapper para el manejo de errores basicos de un request
// asyncronico
const validate = function (handler) {
  return async (req, res) => {
    try {
      await handler(req, res)
    } catch (e) {
      console.log(e)
      res.statusCode = 500
      res.json(createErrorResponse(500, e, null))
    }
  }
}

/* Se debe utilizar como middleware en caso de que la ruta tenga validaciones con express-validator
*/
const validateWithExpress = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(codes.UNPROCESSABLE_ENTITY)
      .json(createErrorResponse(codes.UNPROCESSABLE_ENTITY, errors.mapped(), null))
  }
  next()
}

module.exports = {
  validate,
  validateWithExpress
}
