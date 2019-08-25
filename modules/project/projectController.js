import { addProject, getSpecificProject, getAllStudentProjects, getAllTutorProjects, editProject, removeProject, addProjectWithRequirement } from './projectService'
import { codes, createSuccessResponse } from '../util/responser'

const createProject = async function (req, res) {
  let body = req.body
  let response
  if (body.requirementId != null) response = await addProjectWithRequirement(req.id, body.requirementId, body.type, body.students, body.cotutors, body.departments)
  else response = await addProject(req.id, body.name, body.type, body.description, body.students, body.tutor_id, body.cotutors, body.departments)
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
  let response = await editProject(req.id, req.params.id, body.name, body.type, body.description, body.students, body.tutor_id, body.cotutors, body.departments)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const deleteProject = async function (req, res) {
  let projectId = req.params.id
  let response = await removeProject(projectId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { createProject, getProject, getStudentProjects, getTutorProjects, putProject, deleteProject }
