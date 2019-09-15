import { sequelize } from '../../db/connectorDB'
import { getServiceError, getBadRequest } from '../util/error'
import { Op } from 'sequelize'

const User = require('../../db/models').User
const Profile = require('../../db/models').Profile
const Credential = require('../../db/models').Credential
const Project = require('../../db/models').Project
const ProjectType = require('../../db/models').ProjectType
const State = require('../../db/models').State
const Career = require('../../db/models').Career
const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor

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

  static getUsers (usersId) {
    return User.findAll({ where: { id: { [Op.in]: usersId } } })
  }

  static getUser (id) {
    return User.findByPk(id)
  }

  static getById (id) {
    return User.findByPk(id, {
      attributes: { exclude: ['google_id'] },
      include: [{
        model: Profile,
        as: 'Profiles',
        through: { attributes: [] }
      }]
    })
  }

  static getAll (params) {
    let whereCondition = {}
    if (params.name != null) {
      let names = params.name.split(' ')
      whereCondition.name = { [Op.iLike]: `%${names[0]}%` }
      if (names.length > 1) whereCondition.surname = { [Op.iLike]: `%${names[1]}%` }
    }
    if (params.email != null) whereCondition.email = { [Op.iLike]: `%${params.email}%` }
    return User.findAll({
      attributes: { exclude: ['google_id'] },
      include: [{
        model: Profile,
        as: 'Profiles',
        through: { attributes: [] }
      }],
      where: whereCondition
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
        through: { attributes: [] },
        include: [{ model: ProjectRequestStudent, as: 'StudentRequests', include: [{ model: User, where: { email } }] }]
      },
      {
        model: Project,
        as: 'Creations'
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
        },
        {
          model: Career,
          as: 'Careers',
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
        },
        {
          model: Career,
          as: 'Careers',
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
        },
        {
          model: Career,
          as: 'Careers',
          through: { attributes: [] }
        },
        {
          model: ProjectRequestTutor,
          as: 'TutorRequests',
          where: { user_id: id }
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
        },
        {
          model: Career,
          as: 'Careers',
          through: { attributes: [] }
        },
        {
          model: ProjectRequestTutor,
          as: 'TutorRequests',
          where: { user_id: id }
        }]
      }]
    })
      .then(user => { return { 'Tutorials': user.Tutorials, 'Cotutorials': user.Cotutorials } })
      .catch(() => { return getServiceError() })
  }

  static getCareers (id) {
    return User.findByPk(id, {
      include: [{
        model: Career,
        as: 'Careers'
      }]
    })
      .then(user => { return { 'Careers': user.Careers } })
      .catch(() => { return getServiceError() })
  }

  static edit (id, profiles) {
    return User.findByPk(id)
      .then(user => {
        if (user === null) return null
        else {
          return user.setProfiles(profiles).then(() => { return id })
        }
      })
      .catch(() => { return getServiceError() })
  }
}

export default UserRepository
