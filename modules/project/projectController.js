import * as projectService from './projectService'
import { codes, createSuccessResponse } from '../util/responser'

const createProject = async function (req, res) {
  let body = req.body
  let response
  if (body.requirementId != null) response = await projectService.addProjectWithRequirement(req.id, body.requirementId, body.type, body.students, body.cotutors, body.careers, body.proposalUrl)
  else response = await projectService.addProject(req.id, body.name, body.type, body.description, body.students, body.tutor_id, body.cotutors, body.careers, body.proposalUrl)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const getProject = async function (req, res) {
  let projectId = req.params.id
  let response = await projectService.getSpecificProject(projectId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getStudentProjects = async function (req, res) {
  let response = await projectService.getAllStudentProjects(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const getTutorProjects = async function (req, res) {
  let response = await projectService.getAllTutorProjects(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const putProject = async function (req, res) {
  let body = req.body
  let response = await projectService.editProject(req.id, req.params.id, body.name, body.type, body.description, body.students, body.tutor_id, body.cotutors, body.careers, body.proposalUrl)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

const deleteProject = async function (req, res) {
  let projectId = req.params.id
  let response = await projectService.removeProject(projectId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const deleteStudentProject = async function (req, res) {
  let projectId = req.params.id
  let userId = req.params.user_id
  let response = await projectService.removeStudentProject(projectId, userId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

const deleteTutorProject = async function (req, res) {
  let projectId = req.params.id
  let userId = req.params.user_id
  let response = await projectService.removeTutorProject(projectId, userId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

module.exports = { createProject, getProject, getStudentProjects, getTutorProjects, putProject, deleteProject, deleteStudentProject, deleteTutorProject }
