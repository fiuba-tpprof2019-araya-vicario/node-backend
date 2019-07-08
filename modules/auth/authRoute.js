import { Router } from 'express'
import { authValidations, getUserValidations } from './authValidation'
import { checkIsLoggedWithCredentials } from './authMiddleware'
import { auth, getUser } from './authController'
import { validate, validateWithExpress } from '../util/requestValidator'
const router = Router()

router.post('/', authValidations, validateWithExpress, validate(auth))
router.get('/:id', getUserValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_USERS'), validate(getUser))

export default router
