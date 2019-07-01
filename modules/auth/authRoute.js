import { Router } from 'express'
import { authValidations } from './authValidation'
import { auth } from './authController'
import { validate, validateWithExpress } from '../util/requestValidator'
const router = Router()

router.post('/', authValidations, validateWithExpress, validate(auth))

export default router
