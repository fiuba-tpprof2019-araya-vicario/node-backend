import { Router } from 'express'
import { createValidations, getValidations, modifyValidations } from './presentationValidation'
import * as presentationController from './presentationController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

const router = Router()
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('APPROVE_PROJECTS'), validate(presentationController.createPresentation))
router.put('/:id([0-9]+)?/presentation/', upload.single('file'), validate(presentationController.uploadPresentation))
router.put('/:id([0-9]+)?/documentation/', upload.single('file'), validate(presentationController.uploadDocumentation))
router.put('/:id([0-9]+)?/', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_PROJECTS'), validate(presentationController.putPresentation))
router.get('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(presentationController.getPresentation))
router.put('/:id([0-9]+)?/submit/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('APPROVE_PROJECTS'), validate(presentationController.submitPresentation))

export default router
