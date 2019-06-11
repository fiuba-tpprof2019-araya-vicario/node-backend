import { Router } from 'express'
import { authValidations } from './validation'
import { auth } from './controller'
import { validate, validateWithExpress } from '../util/requestValidator'
const router = Router()

router.post('/', authValidations, validateWithExpress, validate(auth))

export default router
