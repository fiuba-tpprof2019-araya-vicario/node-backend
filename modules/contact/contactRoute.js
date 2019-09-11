import { Router } from 'express'
import { contactValidations } from './contactValidation'
import { contact } from './contactController'
import { validate, validateWithExpress } from '../util/requestValidator'
const router = Router()

router.post('/', contactValidations, validateWithExpress, validate(contact))

export default router
