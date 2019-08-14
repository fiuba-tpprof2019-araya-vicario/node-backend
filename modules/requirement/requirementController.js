import { getAllRequirements, addRequirement } from './requirementService'
import { codes, createSuccessResponse } from '../util/responser'

const getRequirements = async function (req, res) {
  let response = await getAllRequirements()
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const createRequirement = async function (req, res) {
  let body = req.body
  let response = await addRequirement(req.id, body.name, body.description)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { getRequirements, createRequirement }
