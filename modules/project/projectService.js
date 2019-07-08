import { getServiceError } from '../util/error'
import ProjectRepository from './projectRepository'

const getProjects = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return ProjectRepository.getByUser(userId)
      .then(projects => {
        console.log(projects)
        return resolve(projects)
      })
      .catch(() => {
        return reject(getServiceError())
      })
  })
}

const addProject = async (email, name, surname, token, padron, type) => {
  return new Promise(async (resolve, reject) => {
    // TODO: CAMBIAR ESTE HARDCODEO
    // return UserRepository.create(email, name, surname, token, padron, type)
    // return UserRepository.create(email, name, surname, null, padron, type)
    //   .then(user => {
    //     if (user == null) return reject(getUsuarioNoExistente())
    //     user = getUserInfo(user)
    //     let authToken = createToken(user.id, user.email, user.Profiles[0], getCredentials(user))
    //     return resolve(getResponseUser(user, authToken))
    //   })
    //   .catch(() => { return reject(getServiceError()) })
  })
}

module.exports = { addProject, getProjects }
