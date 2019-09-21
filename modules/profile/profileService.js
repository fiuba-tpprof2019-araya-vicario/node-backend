import { getServiceError } from '../util/error'
import ProfileRepository from './profileRepository'

const getProfiles = async () => {
  return ProfileRepository.getProfiles()
    .then(profiles => {
      return Promise.resolve(profiles)
    })
}

module.exports = { getProfiles }
