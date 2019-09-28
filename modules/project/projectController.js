import * as projectService from './projectService'
import { codes, createSuccessResponse } from '../util/responser'

export const createProject = async function (req, res) {
  let body = req.body
  let response
  if (body.requirement_id != null) response = await projectService.addProjectWithRequirement(req.id, body)
  else response = await projectService.addProject(req.id, body)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

export const getProject = async function (req, res) {
  console.log('projectController::getProject')
  let projectId = req.params.id
  let response = await projectService.getSpecificProject(projectId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

export const getProjects = async function (req, res) {
  console.log('projectController::getProjects')
  let response = await projectService.getProjects(req.query)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

export const getStudentProjects = async function (req, res) {
  let response = await projectService.getAllStudentProjects(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

export const getTutorProjects = async function (req, res) {
  let response = await projectService.getAllTutorProjects(req.id)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

export const putProject = async function (req, res) {
  let body = req.body
  let response = await projectService.editProject(req.id, req.params.id, body)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

export const deleteProject = async function (req, res) {
  let projectId = req.params.id
  let response = await projectService.removeProject(projectId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

export const deleteStudentProject = async function (req, res) {
  let projectId = req.params.id
  let userId = req.params.user_id
  let response = await projectService.removeStudentProject(projectId, userId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

export const deleteTutorProject = async function (req, res) {
  let projectId = req.params.id
  let userId = req.params.user_id
  let response = await projectService.removeTutorProject(projectId, userId)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}

export const uploadProposal = async function (req, res) {
  console.log(req.file)
  let response = await projectService.uploadProposal(req.params.id, req.file)
  res.statusCode = codes.CREATED
  res.json(createSuccessResponse(res.statusCode, response))
}

export const evaluateProposal = async function (req, res) {
  console.log('projectController::evaluateProposal')
  let body = req.body
  let response = await projectService.evaluateProposal(req.params.id, req.id, body.career, body.status)
  res.statusCode = codes.OK
  res.json(createSuccessResponse(res.statusCode, response))
}
