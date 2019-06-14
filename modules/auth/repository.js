import { User } from '../../db/models/user'
import { Profile } from '../../db/models/profile'
import { Credential } from '../../db/models/credential'

class UserRepository {
  static get (id) {
    return User.findById(id, {
      include: [
        {
          model: Profile,
          as: 'Profiles',
          include: [
            {
              model: Credential,
              as: 'Credentials'
            }
          ]
        }
      ]
    })
  }

  static getByEmail (email) {
    return User.findOne({
      attributes: ['google_id', 'name', 'surname', 'padron'],
      where: {
        email: email
      }
    })
  }

  static getByEmailAndToken (email, token) {
    return User.findOne({
      where: {
        email: email,
        google_id: token
      },
      include: [
        {
          model: Profile,
          as: 'Profiles',
          include: [
            {
              model: Credential,
              as: 'Credentials'
            }
          ]
        }
      ]
    })
  }
}

export default UserRepository
