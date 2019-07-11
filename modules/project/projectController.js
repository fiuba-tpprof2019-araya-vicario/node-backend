import { addProject, getStudentProjects, getSpecificProject, editProject } from './projectService'
import { codes, createSuccessResponse } from '../util/responser'

const createProject = async function (req, res) {
  let body = req.body
  let response = await addProject(req.id, body.name, body.type, body.description, body.students, body.tutor_id, body.cotutors)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const getMyProjects = async function (req, res) {
  let response = await getStudentProjects(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getProject = async function (req, res) {
  let projectId = req.params.id
  let response = await getSpecificProject(projectId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const putProject = async function (req, res) {
  let body = req.body
  let response = await editProject(req.id, req.params.id, body.name, body.type, body.description, body.students, body.tutor_id, body.cotutors)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { createProject, getMyProjects, getProject, putProject }
