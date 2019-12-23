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
const ProjectCareer = require('../../db/models').ProjectCareer
const UserCareer = require('../../db/models').UserCareer
const ProjectRequestStudent = require('../../db/models').ProjectRequestStudent
const ProjectRequestTutor = require('../../db/models').ProjectRequestTutor

const getWhereForAllUsers = (params) => {
  let whereCondition = {}
  if (params.name != null) {
    let names = params.name.split(' ')
    whereCondition.name = { [Op.iLike]: `%${names[0]}%` }
    if (names.length > 1) whereCondition.surname = { [Op.iLike]: `%${names[1]}%` }
  }
  if (params.email != null) whereCondition.email = { [Op.iLike]: `%${params.email}%` }
  return whereCondition
}

const getWhereForTypeOfUsers = (params) => {
  let whereCondition = []
  if (params.type != null) {
    let credentialId
    if (params.type === 'student') {
      credentialId = 2
    } else if (params.type === 'tutor') {
      credentialId = 8
    }

    credentialId && whereCondition.push({
      model: Profile,
      as: 'Profiles',
      required: true,
      attributes: [],
      through: { attributes: [] },
      include: {
        model: Credential,
        as: 'Credentials',
        required: true,
        attributes: [],
        through: { attributes: [] },
        where: {
          id: credentialId
        }
      }
    })
  }
  return whereCondition
}

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
        through: { attributes: [] },
        include: [{ model: ProjectRequestStudent, as: 'StudentRequests', include: [{ model: User, where: { id } }] }]
      },
      {
        model: Project,
        as: 'Creations'
      },
      {
        model: Career,
        as: 'Careers'
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
      },
      {
        model: Career,
        as: 'Careers',
        through: { attributes: [] }
      }]
    })
  }

  static getAll (params) {
    const whereCondition = getWhereForAllUsers(params)
    const whereForType = getWhereForTypeOfUsers(params)
    return User.findAll({
      attributes: { exclude: ['google_id'] },
      include: whereForType,
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
      },
      {
        model: Career,
        as: 'Careers'
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

  static async create (email, name, surname, token, padron, profilesId) {
    return sequelize.transaction(transaction => {
      return User.create({
        email: email,
        name: name,
        google_id: token,
        surname: surname,
        padron: padron
      }, { transaction })
        .then(userWithoutProfiles => {
          return userWithoutProfiles.setProfiles(profilesId, { transaction })
            .then(userWithProfiles => {
              return UserRepository.get(userWithProfiles.dataValues.id, transaction)
            })
        })
    })
      .then(user => {
        return user
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
      })
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
      })
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
          model: ProjectCareer,
          include: [{ model: Career }]
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
          model: ProjectCareer,
          include: [{ model: Career }]
        }]
      }]
    })
      .then(user => { return { 'Creations': user.Creations, 'Participations': user.Participations } })
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
          model: ProjectCareer,
          include: [{ model: Career }]
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
          model: ProjectCareer,
          include: [{ model: Career }]
        },
        {
          model: ProjectRequestTutor,
          as: 'TutorRequests',
          where: { user_id: id }
        }]
      }]
    })
      .then(user => { return { 'Tutorials': user.Tutorials, 'Cotutorials': user.Cotutorials } })
  }

  static getCareers (id) {
    return User.findByPk(id, {
      include: [{
        model: Career,
        as: 'Careers'
      }]
    })
      .then(user => { return { 'Careers': user.Careers } })
  }

  static async edit (id, profiles, careers) {
    let user = await User.findByPk(id)
    if (user === null) return null
    return Promise.all([user.setProfiles(profiles), user.setCareers(careers)]).then(() => { return id })
  }

  static hasCareer (id, careerId) {
    return UserCareer.findOne({ where: { user_id: id, career_id: careerId } })
      .then(result => {
        return result != null
      })
  }
}

export default UserRepository
