import { addDepartment, getSpecificDepartment, getDepartments, editDepartment, removeDepartment } from './departmentService'
import { codes, createSuccessResponse } from '../util/responser'

const createDepartment = async function (req, res) {
  let body = req.body
  let response = await addDepartment(req.id, body.name, body.description)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const getDepartment = async function (req, res) {
  let departmentId = req.params.id
  let response = await getSpecificDepartment(departmentId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getAllDepartments = async function (req, res) {
  let response = await getDepartments(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const putDepartment = async function (req, res) {
  let body = req.body
  let response = await editDepartment(req.id, req.params.id, body.name, body.description)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const deleteDepartment = async function (req, res) {
  let departmentId = req.params.id
  let response = await removeDepartment(departmentId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { createDepartment, getDepartment, getAllDepartments, putDepartment, deleteDepartment }
