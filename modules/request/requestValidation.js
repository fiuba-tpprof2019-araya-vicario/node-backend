import { check, param, oneOf } from 'express-validator/check'

const MISS_REQUEST_ID = 'Falta el id de la solicitud'
const MISS_STATUS = 'Falta el estado'
const WRONG_STATUS_VALUE = 'Estado invalido'
const MISS_TYPE = 'Falta el tipo'
const WRONG_TYPE_VALUE = 'Tipo invalido'

const putValidations = [
  param('id')
    .exists()
    .withMessage(MISS_REQUEST_ID),
  check('status')
    .exists()
    .withMessage(MISS_STATUS),
  oneOf([
    check('status').equals('accepted'),
    check('status').equals('rejected')
  ], WRONG_STATUS_VALUE)
]

const putTutorValidations = [
  ...putValidations,
  check('type')
    .exists()
    .withMessage(MISS_TYPE),
  oneOf([
    check('type').equals('tutor'),
    check('type').equals('cotutor')
  ], WRONG_TYPE_VALUE)
]

// const checkRequestStudent = () => {
//   return async (req, res, next) => {
//     try {
//       let request = await RequestRepository.getRequestStudentById(req.params.id)
//       if (request != null && request.dataValues.status === 'pending') {
//         next()
//       } else {
//         let error = getBadRequest()
//         res.statusCode = error.status
//         res.json(createErrorResponse(error.status, error, null))
//       }
//     } catch (e) {
//       let error = getBadRequest()
//       res.statusCode = error.status
//       res.json(createErrorResponse(error.status, error, null))
//     }
//   }
// }

// const checkRequestTutor = () => {
//   return async (req, res, next) => {
//     try {
//       let request = await RequestRepository.getRequestTutorById(req.params.id)
//       if (request != null && request.pending()) {
//         if (req.body.status === 'accepted' && request.isTutor()) {
//           let project = await ProjectRepository.getProjectById(request.dataValues.project_id)
//           if (project != null && project.inRevision()) {
//             req.isTutor = request.isTutor()
//             req.projectStateId = project.dataValues.state_id
//             req.projectTypeId = project.dataValues.type_id
//             req.projectId = project.dataValues.id
//             next()
//           } else {
//             let error = getBadRequest()
//             res.statusCode = error.status
//             res.json(createErrorResponse(error.status, error, null))
//           }
//         }
//         next()
//       } else {
//         let error = getBadRequest()
//         res.statusCode = error.status
//         res.json(createErrorResponse(error.status, error, null))
//       }
//     } catch (e) {
//       let error = getBadRequest()
//       res.statusCode = error.status
//       res.json(createErrorResponse(error.status, error, null))
//     }
//   }
// }

export { putValidations, putTutorValidations }
