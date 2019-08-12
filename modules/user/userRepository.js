import { sequelize } from '../../db/connectorDB'
import { getServiceError } from '../util/error'

const User = require('../../db/models').User
const Profile = require('../../db/models').Profile
const Credential = require('../../db/models').Credential
const Project = require('../../db/models').Project
const ProjectType = require('../../db/models').ProjectType
const State = require('../../db/models').State
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor
const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent

class UserRepository {
  static get (id, transaction) {
    let options = {
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
        as: 'Participations',
        through: { attributes: [] }
      },
      {
        model: Project,
        as: 'Creations'
      },
      {
        model: Project,
        as: 'Cotutorials',
        through: { attributes: [] }
      },
      {
        model: Project,
        as: 'Tutorials'
      }]
    }

    if (transaction !== undefined) {
      options['transaction'] = transaction
    }

    return User.findByPk(id, options)
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
        as: 'Participations',
        through: { attributes: [] }
      },
      {
        model: Project,
        as: 'Creations'
      },
      {
        model: Project,
        as: 'Cotutorials',
        through: { attributes: [] }
      },
      {
        model: Project,
        as: 'Tutorials'
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

  static create (email, name, surname, token, padron, profilesId) {
    return sequelize.transaction(transaction => {
      return User.create({
        email: email,
        name: name,
        google_id: token,
        surname: surname,
        padron: padron
      }, { transaction })
        .then(userWithoutProfiles => {
          return userWithoutProfiles.addProfiles(profilesId, { transaction })
            .then(() => {
              return UserRepository.get(userWithoutProfiles.dataValues.id, transaction)
            })
        })
        .then(user => {
          return user
        }).catch(() => {
          return null
        })
    })
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
        as: 'Creations',
        include: [{
          model: User,
          as: 'Creator',
          attributes: { exclude: ['google_id'] }
        },
        {
          model: User,
          as: 'Tutor',
          attributes: { exclude: ['google_id'] }
        },
        {
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
          as: 'Cotutors',
          attributes: { exclude: ['google_id'] },
          through: { attributes: [] }
        }]
      },
      {
        model: Project,
        as: 'Participations',
        through: { attributes: [] },
        include: [{
          model: User,
          as: 'Creator',
          attributes: { exclude: ['google_id'] }
        },
        {
          model: User,
          as: 'Tutor',
          attributes: { exclude: ['google_id'] }
        },
        {
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
          as: 'Cotutors',
          attributes: { exclude: ['google_id'] },
          through: { attributes: [] }
        }]
      }]
    })
      .then(user => { return { 'Creations': user.Creations, 'Participations': user.Participations } })
      .catch(() => { return getServiceError() })
  }

  static getTutorProjects (id) {
    return User.findByPk(id, {
      include: [{
        model: Project,
        as: 'Tutorials',
        include: [{
          model: User,
          as: 'Creator',
          attributes: { exclude: ['google_id'] }
        },
        {
          model: User,
          as: 'Tutor',
          attributes: { exclude: ['google_id'] }
        },
        {
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
          as: 'Cotutors',
          attributes: { exclude: ['google_id'] },
          through: { attributes: [] }
        }]
      },
      {
        model: Project,
        as: 'Cotutorials',
        through: { attributes: [] },
        include: [{
          model: User,
          as: 'Creator',
          attributes: { exclude: ['google_id'] }
        },
        {
          model: User,
          as: 'Tutor',
          attributes: { exclude: ['google_id'] }
        },
        {
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
          as: 'Cotutors',
          attributes: { exclude: ['google_id'] },
          through: { attributes: [] }
        }]
      }]
    })
      .then(user => { return { 'Tutorials': user.Tutorials, 'Cotutorials': user.Cotutorials } })
      .catch(() => { return getServiceError() })
  }

  static getStudentRequests (id) {
    return User.findByPk(id, {
      include: [{
        model: ProjectRequestStudent,
        as: 'StudentRequests'
      }]
    })
      .then(user => { return user.StudentRequests })
      .catch(() => { return getServiceError() })
  }

  static getTutorRequests (id) {
    return User.findByPk(id, {
      include: [{
        model: ProjectRequestTutor,
        as: 'TutorRequests'
      }]
    })
      .then(user => { return user.TutorRequests })
      .catch(() => { return getServiceError() })
  }
}

export default UserRepository
