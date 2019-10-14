import { getAllRequirements, addRequirement, editRequirement, removeRequirement } from './requirementService'
import { codes, createSuccessResponse } from '../util/responser'

const getRequirements = async function (req, res) {
  let response = await getAllRequirements()
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const createRequirement = async function (req, res) {
  let body = req.body
  let response = await addRequirement(req.id, body.name, body.description, req.file)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const putRequirement = async function (req, res) {
  let body = req.body
  let response = await editRequirement(req.id, req.params.id, body.name, body.description, req.file)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const deleteRequirement = async function (req, res) {
  let requirementId = req.params.id
  let response = await removeRequirement(requirementId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getRequirements, createRequirement, putRequirement, deleteRequirement }
