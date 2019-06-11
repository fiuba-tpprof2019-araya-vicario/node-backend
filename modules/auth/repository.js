import { User } from '../../db/models'

class UserRepository {
  static get (id) {
    return User.findById(id)
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
      attributes: ['name', 'surname', 'padron'],
      where: {
        email: email,
        google_id: token
      }
    })
  }
}

export default UserRepository
