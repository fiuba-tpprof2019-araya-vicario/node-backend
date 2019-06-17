const User = require('../../db/models').User
const Profile = require('../../db/models').Profile
const Credential = require('../../db/models').Credential

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
      where: {
        email: email
      },
      include: [{
        model: Profile,
        as: 'Profiles',
        attributes: ['name', 'description'],
        include: [
          {
            model: Credential,
            as: 'Credentials'
          }
        ]
      }],
      raw: true,
      nest: true
    })
  }

  static getByEmailAndToken (email, token) {
    return User.findOne({
      where: {
        email,
        google_id: token
      },
      include: [{
        model: Profile,
        as: 'Profiles',
        attributes: ['name', 'description'],
        through: {
          attributes: []
        },
        include: [
          {
            model: Credential,
            as: 'Credentials',
            attributes: ['name', 'description'],
            through: {
              attributes: []
            }
          }
        ]
      }],
      attributes: ['id', 'email', 'name', 'surname', 'padron']
      // raw: true
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
