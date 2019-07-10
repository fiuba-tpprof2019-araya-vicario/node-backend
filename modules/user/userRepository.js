import { getServiceError } from '../util/error'

const User = require('../../db/models').User
const Profile = require('../../db/models').Profile
const Credential = require('../../db/models').Credential
const Project = require('../../db/models').Project
const ProjectType = require('../../db/models').ProjectType
const State = require('../../db/models').State

class UserRepository {
  static get (id) {
    return User.findByPk(id, {
      attributes: { exclude: ['google_id'] },
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
      },
      {
        model: Project,
        as: 'Projects',
        through: { attributes: [] }
      }]
    })
  }

  static getByProfile (profileId) {
    let whereCondition = {}
    if (profileId != null) whereCondition['id'] = profileId
    return User.findAll({
      include: [{
        model: Profile,
        as: 'Profiles',
        attributes: { exclude: ['google_id'] },
        where: whereCondition
      }]
    })
  }

  static getByEmailAndToken (email, token) {
    return User.findOne({
      where: {
        email,
        google_id: token
      },
      attributes: { exclude: ['google_id'] },
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
      },
      {
        model: Project,
        as: 'Projects',
        through: { attributes: [] }
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

  static async create (email, name, surname, token, padron, profilesId) {
    try {
      let userWithoutProfiles = await UserRepository.createUser(email, name, surname, token, padron)
      await userWithoutProfiles.addProfiles(profilesId)
      let user = await UserRepository.get(userWithoutProfiles.dataValues.id)
      return user
    } catch (e) {
      return null
    }
  }

  static existTutors (tutorsId) {
    return User.count({
      where: { id: tutorsId },
      include: {
        model: Profile,
        as: 'Profiles',
        where: {
          id: 3
        }
      }
    })
      .then(count => {
        if (count === tutorsId.length) {
          return true
        }
        return false
      }).catch(() => { return getServiceError() })
  }

  static existStudents (studentsId) {
    return User.count({
      where: { id: studentsId },
      include: {
        model: Profile,
        as: 'Profiles',
        where: {
          id: 2
        }
      }
    })
      .then(count => {
        if (count === studentsId.length) {
          return true
        }
        return false
      }).catch(() => { return getServiceError() })
  }

  static getStudentProjects (id) {
    return User.findByPk(id, {
      include: [{
        model: Project,
        as: 'Projects',
        through: { attributes: [] },
        include: [{
          model: ProjectType,
          as: 'Type'
        },
        {
          model: State,
          as: 'State'
        },
        {
          model: User,
          as: 'Students',
          attributes: { exclude: ['google_id'] },
          through: { attributes: [] }
        },
        {
          model: User,
          as: 'Tutors',
          attributes: { exclude: ['google_id'] },
          through: { attributes: [] }
        }]
      }]
    })
      .then(user => { return user.Projects })
      .catch(() => { return getServiceError() })
  }
}

export default UserRepository
