import { Router } from 'express'
import { createValidations, getValidations, modifyValidations, deleteUserProjectValidations, evaluateValidations } from './projectValidation'
import * as projectController from './projectController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(projectController.getProjects))
router.get('/students/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(projectController.getStudentProjects))
router.get('/tutors/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(projectController.getTutorProjects))
router.get('/types/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(projectController.getTypesProjects))
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('CREATE_PROJECTS'), validate(projectController.createProject))
router.put('/:id([0-9]+)?/', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_PROJECTS'), validate(projectController.putProject))
router.get('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(projectController.getProject))
router.delete('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_PROJECTS'), validate(projectController.deleteProject))
router.delete('/:id([0-9]+)?/students/:user_id([0-9]+)?/', deleteUserProjectValidations, validateWithExpress, checkIsLoggedWithCredentials('EDIT_PROJECTS'), validate(projectController.deleteStudentProject))
router.delete('/:id([0-9]+)?/tutors/:user_id([0-9]+)?/', deleteUserProjectValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(projectController.deleteTutorProject))
router.put('/:id([0-9]+)?/proposal/', upload.single('file'), validate(projectController.uploadProposal))
router.put('/:id([0-9]+)?/assessments/', evaluateValidations, validateWithExpress, checkIsLoggedWithCredentials('APPROVE_PROJECTS'), validate(projectController.evaluateProposal))

export default router
