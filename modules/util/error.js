const getAuthorizationFail = () => {
  return {
    msg: 'Usuario no autorizado',
    status: 401
  }
}

const getUsuarioNoExistente = () => {
  return {
    msg: 'Usuario no existente',
    status: 402
  }
}

const getTokenExpired = () => {
  var err = new Error('El token expiro')
  err.status = 404
  return err
}

const getServiceError = (msg) => {
  var err = {}
  err.msg = msg
  err.status = 500
  return err
}

const getServiceErrorNotFound = (msg) => {
  var err = {}
  err.msg = msg
  err.status = 404
  return err
}

const getServiceErrorAlreadyExists = (msg) => {
  var err = {}
  err.msg = msg
  err.status = 409
  return err
}

const getServiceErrorAlreadyModified = () => {
  var err = {}
  err.msg = 'Conflicto en el update'
  err.status = 409
  return err
}

const getServiceErrorNotMatch = (msg, value1, value2) => {
  var err = {}
  err.msg = msg + ': ' + value1 + ' <> ' + value2
  err.status = 409
  return err
}

const getServiceErrorBadRequest = (msg) => {
  var err = {}
  err.msg = msg
  err.status = 400
  return err
}

const getServiceErrorLostParams = (params) => {
  var err = {}
  let lostParms = ''
  params.forEach(element => {
    if (lostParms === '') {
      lostParms += element
    } else {
      lostParms += ', ' + element
    }
  })
  let msg = 'Incumplimiento de precondiciones ' + lostParms
  err.msg = msg
  err.status = 400
  return err
}

exports.getAuthorizationFail = getAuthorizationFail
exports.getTokenExpired = getTokenExpired
exports.getServiceError = getServiceError
exports.getServiceErrorNotFound = getServiceErrorNotFound
exports.getServiceErrorAlreadyExists = getServiceErrorAlreadyExists
exports.getServiceErrorNotMatch = getServiceErrorNotMatch
exports.getServiceErrorBadRequest = getServiceErrorBadRequest
exports.getServiceErrorLostParams = getServiceErrorLostParams
exports.getServiceErrorAlreadyModified = getServiceErrorAlreadyModified
exports.getUsuarioNoExistente = getUsuarioNoExistente
