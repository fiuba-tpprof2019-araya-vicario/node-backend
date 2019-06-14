import { User } from '../../db/models/user'
import Profile from '../../db/models/profile'
import Credential from '../../db/models/credential'

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

    console.log(User)
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

  static create (email, name, surname, padron, type) {
    return User.create({
      email: email,
      name: name,
      surname: surname,
      padron: padron
    },
    {
      include: [{
        association: User.Profiles,
        include: [ type ]
      }]
    })
  }
}

export default UserRepository
