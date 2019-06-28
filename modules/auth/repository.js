const User = require('../../db/models').User
const Profile = require('../../db/models').Profile
const Credential = require('../../db/models').Credential
const UserProfile = require('../../db/models').UserProfile

class UserRepository {
  static get (id) {
    return User.findByPk(id, {
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
        console.log('user', user)
        console.log('profiles', profiles)
        return user.addProfiles(profiles)
          .then(result => {
            console.log(result)
            console.log(user.get())
            console.log(user.get().id)
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
