import { Router } from 'express'
import { getRequirements, createRequirement, putRequirement, deleteRequirement } from './requirementController'
import { createValidations, modifyValidations, getValidations } from './requirementValidation'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getRequirements))
router.post('/', upload.single('file'), createValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_REQUIREMENTS'), validate(createRequirement))
router.put('/:id([0-9]+)?/', upload.single('file'), modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_REQUIREMENTS'), validate(putRequirement))
router.delete('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_REQUIREMENTS'), validate(deleteRequirement))

export default router
