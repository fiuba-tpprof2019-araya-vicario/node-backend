const { validationResult } = require('express-validator/check')
const responser = require('./responser')

// Usada como wrapper para el manejo de errores basicos de un request
// asyncronico
exports.validate = (handler) => async (req, res) => {
  try {
    await handler(req, res)
  } catch (e) {
    res.statusCode = e.status
    res.json(responser.createErrorResponse(e.status, e, null))
  }
}

/* Se debe utilizar como middleware en caso de que la ruta tenga validaciones con express-validator
*/
exports.validateWithExpress = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(responser.codes.UNPROCESSABLE_ENTITY)
      .json(responser.createErrorResponse(responser.codes.UNPROCESSABLE_ENTITY, errors.mapped(), null))
  }
  next()
}
