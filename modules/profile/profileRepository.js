const Profile = require('../../db/models').Profile
const Credential = require('../../db/models').Credential

class ProfileRepository {
  static getProfiles () {
    return Profile.findAll({
      include: [{
        model: Credential,
        as: 'Credentials',
        through: { attributes: [] }
      }]
    })
  }
}

export default ProfileRepository
