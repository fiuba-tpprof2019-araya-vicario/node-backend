import { Router } from 'express'
import { getUserValidations } from './userValidation'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'
import { getUsers, getUser } from './userController'
import { validate, validateWithExpress } from '../util/requestValidator'
const router = Router()

router.get('', validateWithExpress, checkIsLoggedWithCredentials('GET_USERS'), validate(getUsers))
router.get('/:id', getUserValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_USERS'), validate(getUser))

export default router
