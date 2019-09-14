import { Router } from 'express'
import { getUserValidations } from './userValidation'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'
import { getUsers, getUser, createAux, getProfiles } from './userController'
import { validate, validateWithExpress } from '../util/requestValidator'
const router = Router()

router.get('/', validateWithExpress, checkIsLoggedWithCredentials('GET_USERS'), validate(getUsers))
router.get('/:id([0-9]+)?/', getUserValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_USERS'), validate(getUser))
router.post('/createAux/', validate(createAux))
router.get('/profiles/', validateWithExpress, checkIsLoggedWithCredentials('GET_USERS'), validate(getProfiles))

export default router
