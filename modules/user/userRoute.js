import { Router } from 'express'
import { getUserValidations, editUserValidations } from './userValidation'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'
import { getUsers, getUser, createAux, editUser } from './userController'
import { validate, validateWithExpress } from '../util/requestValidator'
const router = Router()

router.get('/', validateWithExpress, checkIsLoggedWithCredentials('GET_USERS'), validate(getUsers))
router.get('/:id([0-9]+)?/', getUserValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_USERS'), validate(getUser))
router.post('/createAux/', validate(createAux))
router.put('/:id([0-9]+)?/', editUserValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_USERS'), validate(editUser))

export default router
