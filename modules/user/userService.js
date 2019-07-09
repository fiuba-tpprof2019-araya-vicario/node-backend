import { getUsuarioNoExistente } from '../util/error'
import UserRepository from './userRepository'

const getUserById = async (userId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.get(userId)
      .then(user => {
        if (user == null) return reject(getUsuarioNoExistente())
        return resolve(user)
      })
      .catch(() => { return reject(getUsuarioNoExistente()) })
  })
}

const getUsersByProfileResponse = (users) => {
  return users.map(user => { return { id: user.dataValues.id, name: `${user.dataValues.name} ${user.dataValues.surname}` } })
}

const getUsersByProfile = async (profileId) => {
  return new Promise(async (resolve, reject) => {
    return UserRepository.getByProfile(profileId)
      .then(users => {
        if (users == null) return reject(getUsuarioNoExistente())
        return resolve(getUsersByProfileResponse(users))
      })
      .catch(() => { return reject(getUsuarioNoExistente()) })
  })
}

module.exports = { getUserById, getUsersByProfile }
