import { Router } from 'express'
import { createValidations, getValidations, modifyValidations } from './careerValidation'
import { createCareer, getCareer, getAllCareers, putCareer, deleteCareer } from './careerController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getAllCareers))
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(createCareer))
router.put('/:id([0-9]+)?/', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(putCareer))
router.get('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getCareer))
router.delete('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(deleteCareer))

export default router
