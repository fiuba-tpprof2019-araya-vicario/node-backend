import { getServiceError } from '../util/error'
import ProfileRepository from './profileRepository'

const getProfiles = async () => {
  return new Promise(async (resolve, reject) => {
    return ProfileRepository.getProfiles()
      .then(profiles => {
        return resolve(profiles)
      })
      .catch(() => { return reject(getServiceError()) })
  })
}

module.exports = { getProfiles }
