import { addProject, getSpecificProject, getAllStudentProjects, getAllTutorProjects, editProject } from './projectService'
import { codes, createSuccessResponse } from '../util/responser'

const createProject = async function (req, res) {
  let body = req.body
  let response = await addProject(req.id, body.name, body.type, body.description, body.students, body.tutor_id, body.cotutors)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const getProject = async function (req, res) {
  let projectId = req.params.id
  let response = await getSpecificProject(projectId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getStudentProjects = async function (req, res) {
  let response = await getAllStudentProjects(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getTutorProjects = async function (req, res) {
  let response = await getAllTutorProjects(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const putProject = async function (req, res) {
  let body = req.body
  let response = await editProject(req.id, req.params.id, body.name, body.type, body.description, body.students, body.tutor_id, body.cotutors)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { createProject, getProject, getStudentProjects, getTutorProjects, putProject }
