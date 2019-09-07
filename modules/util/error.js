export const getAuthorizationFail = () => {
  return {
    msg: 'Usuario no autorizado',
    status: 401
  }
}

export const getUsuarioNoExistente = () => {
  return {
    msg: 'Usuario no existente',
    status: 400
  }
}

export const getBadRequest = (msg) => {
  return {
    msg: msg !== undefined ? msg : 'Alguno de los campos no es correcto',
    status: 400
  }
}

export const getNotFound = () => {
  return {
    msg: 'Recurso solicitado inexistente',
    status: 404
  }
}

export const getTokenExpired = () => {
  return {
    msg: 'El token expiro',
    status: 404
  }
}

export const getServiceError = (msg) => {
  return {
    msg,
    status: 404
  }
}

export const getExpressError = (errorExpressObject) => {
  return {
    msg: errorExpressObject.msg,
    status: 404
  }
}
