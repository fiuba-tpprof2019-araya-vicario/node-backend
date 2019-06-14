import jwt from 'jwt-simple'
import moment from 'moment'
import { getTokenExpired, getAuthorizationFail } from '../util/error'
import { createErrorResponse } from '../../../util/responser'

const checkIsLoggedWithCredentials = function (askedCredentials) {
  return function (req, res, next) {
    if (req.headers && req.headers.authorization) {
      try {
        let payload = jwt.decode(req.headers.authorization, process.env.TOKEN_SECRET)
        if (payload.exp <= moment().unix()) {
          next(getTokenExpired())
        }
        if (askedCredentials !== undefined && !payload.credentials.includes(askedCredentials)) {
          throw new Error('Usuario no autorizado')
        }
        req.id = payload.id
        req.credentials = payload.credentials
        req.email = payload.email
        req.name = payload.name
        req.surname = payload.surname
        req.profile = payload.profile

        next()
      } catch (e) {
        let error = getAuthorizationFail()
        next(createErrorResponse(error.status, error, error))
      }
    } else {
      let error = getAuthorizationFail()
      next(createErrorResponse(error.status, error, error))
    }
  }
}

export { checkIsLoggedWithCredentials }
