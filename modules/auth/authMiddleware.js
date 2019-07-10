import jwt from 'jsonwebtoken'
import moment from 'moment'
import { getTokenExpired, getAuthorizationFail } from '../util/error'
import { createErrorResponse } from '../util/responser'

const checkIsLoggedWithCredentials = function (askedCredentials) {
  return function (req, res, next) {
    if (req.headers && req.headers.authorization) {
      try {
        let payload = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET_JWT)
        if (payload.exp <= moment().unix()) {
          next(getTokenExpired())
        }
        if (askedCredentials !== undefined && !payload.credentials.includes(askedCredentials)) {
          throw new Error('Usuario no autorizado')
        }
        req.id = payload.id
        req.credentials = payload.credentials
        req.email = payload.email
        next()
      } catch (e) {
        let error = getAuthorizationFail()
        next(createErrorResponse(error.status, error.message, error))
      }
    } else {
      let error = getAuthorizationFail()
      next(createErrorResponse(error.status, error.message, error))
    }
  }
}

exports.checkIsLoggedWithCredentials = checkIsLoggedWithCredentials
