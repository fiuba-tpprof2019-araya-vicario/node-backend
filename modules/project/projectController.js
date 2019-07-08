import { addProject, getProjects } from './projectService'
import { codes, createSuccessResponse } from '../util/responser'

const createProject = async function (req, res) {
  let body = req.body
  let response = await addProject(req.id, body.name, body.description, body.students, body.tutors)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const getMyProjects = async function (req, res) {
  let response = await getProjects(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { createProject, getMyProjects }
