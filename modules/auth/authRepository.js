const User = require('../../db/models').User
const Profile = require('../../db/models').Profile
const Credential = require('../../db/models').Credential

class UserRepository {
  static get (id) {
    return User.findByPk(id, {
      attributes: {
        exclude: ['google_id']
      },
      include: [{
        model: Profile,
        as: 'Profiles',
        include: [
          {
            model: Credential,
            as: 'Credentials',
            attributes: {
              exclude: ['id', 'description', 'createdAt', 'updatedAt', 'ProfileCredential']
            },
            through: { attributes: [] }
          }
        ]
      }]
    })
  }

  static getByEmail (email) {
    return User.findOne({
      where: {
        email: email
      },
      attributes: {
        exclude: ['google_id']
      },
      include: [{
        model: Profile,
        as: 'Profiles',
        include: [
          {
            model: Credential,
            as: 'Credentials',
            attributes: {
              exclude: ['id', 'description', 'createdAt', 'updatedAt', 'ProfileCredential']
            },
            through: { attributes: [] }
          }
        ]
      }]
    })
  }

  static getByEmailAndToken (email, token) {
    return User.findOne({
      where: {
        email,
        google_id: token
      },
      attributes: {
        exclude: ['google_id']
      },
      include: [{
        model: Profile,
        as: 'Profiles',
        include: [
          {
            model: Credential,
            as: 'Credentials',
            attributes: {
              exclude: ['id', 'description', 'createdAt', 'updatedAt', 'ProfileCredential']
            },
            through: { attributes: [] }
          }
        ]
      }]
    })
  }

  static createUser (email, name, surname, token, padron) {
    return User.create({
      email: email,
      name: name,
      google_id: token,
      surname: surname,
      padron: padron
    })
  }

  static getProfiles (profiles) {
    return Profile.findAll({
      where: {
        id: profiles
      }
    })
  }

  static create (email, name, surname, token, padron, profiles) {
    let promiseUser = UserRepository.createUser(email, name, surname, token, padron)
    let promiseProfiles = UserRepository.getProfiles(profiles)
    return Promise.all([promiseUser, promiseProfiles])
      .then(([user, profiles]) => {
        return user.addProfiles(profiles)
          .then(result => {
            return UserRepository.get(user.get().id)
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default UserRepository
