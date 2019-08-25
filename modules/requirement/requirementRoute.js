import { Router } from 'express'
import { getRequirements, createRequirement, putRequirement, deleteRequirement } from './requirementController'
import { createValidations, modifyValidations, getValidations } from './requirementValidation'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getRequirements))
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(createRequirement))
router.put('/:id([0-9]+)?/', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(putRequirement))
router.delete('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(deleteRequirement))

export default router
