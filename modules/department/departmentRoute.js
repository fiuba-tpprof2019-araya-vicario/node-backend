import { Router } from 'express'
import { createValidations, getValidations, modifyValidations } from './departmentValidation'
import { createDepartment, getDepartment, getAllDepartments, putDepartment, deleteDepartment } from './departmentController'
import { validate, validateWithExpress } from '../util/requestValidator'
import { checkIsLoggedWithCredentials } from '../auth/authMiddleware'

const router = Router()
router.get('/', checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getAllDepartments))
router.post('/', createValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(createDepartment))
router.put('/:id([0-9]+)?/', modifyValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(putDepartment))
router.get('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(getDepartment))
router.delete('/:id([0-9]+)?/', getValidations, validateWithExpress, checkIsLoggedWithCredentials('GET_PROJECTS'), validate(deleteDepartment))

export default router
