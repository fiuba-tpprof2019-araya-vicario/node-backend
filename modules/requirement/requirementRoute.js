import { Router } from 'express'
import { getRequirements, createRequirement } from './requirementController'
import { createValidations, checkCreatorTutor } from './requirementValidation'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_REQUIREMENTS'), validate(getRequirements))
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('CREATE_PROJECT'), checkCreatorTutor(), validate(createRequirement))

export default router
