import { STRING, INTEGER, FLOAT } from 'sequelize'

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: STRING,
      allowNull: false,
      isUnique: true,
      validate: {
        isEmail: true,
        // TODO: SACAR PARA VALIDAR SOLO MAIL FIUBA
        // is: /@fi.uba.ar$/i,
        notEmpty: true,
        len: [
          1, 255
        ],
        isUnique: function (value, next) {
          var self = this
          User
            .findOne({
              where: {
                email: value
              }
            })
            .then(function (user) {
              if (user && self.id !== user.id) {
                return next('Email ya en uso por otro usuario')
              }
              return next()
            })
            .catch(function (err) {
              return next(err)
            })
        }
      }
    },
    name: {
      type: STRING,
      validate: {
        notEmpty: true
      }
    },
    surname: {
      type: STRING,
      validate: {
        notEmpty: true
      }
    },
    padron: INTEGER,
    google_id: STRING,
    norm_score: FLOAT
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Users',
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  })

  // Adding a class level method
  User.associate = function (models) {
    User.belongsToMany(models.Profile, {
      as: 'Profiles',
      through: {
        model: models.UserProfile
      }
    })

    User.belongsToMany(models.Project, {
      as: 'Participations',
      through: {
        model: models.ProjectStudent
      }
    })

    User.belongsToMany(models.Project, {
      as: 'Cotutorials',
      through: {
        model: models.ProjectCotutor
      }
    })

    User.hasMany(models.Project, {
      as: 'Creations',
      foreignKey: 'creator_id'
    })

    User.hasMany(models.Project, {
      as: 'Tutorials',
      foreignKey: 'tutor_id'
    })

    User.hasMany(models.ProjectRequestTutor, {
      as: 'TutorRequests',
      foreignKey: 'user_id'
    })

    User.hasMany(models.ProjectRequestStudent, {
      as: 'StudentRequests',
      foreignKey: 'user_id'
    })

    User.belongsToMany(models.Career, {
      as: 'Careers',
      through: {
        model: models.UserCareer
      }
    })

    User.hasMany(models.UserInterest, {
      as: 'UserInterests',
      foreignKey: 'user_id'
    })
  }

  User.getMsgEmailsNoMatch = function () {
    return 'Los emails no coinciden'
  }
  User.getMsgPwdsNoMatch = function () {
    return 'Los password no coinciden'
  }
  User.getMsgInexistente = function () {
    return 'Usuario inexistente'
  }
  User.getMsgRolInexistenteParaUsuario = function () {
    return 'Rol no existente para el usuario'
  }

  User.getMsgRolYaExistenteParaUsuario = function () {
    return 'Rol ya existente para el usuario'
  }

  User.getTelefonoRegex = function () {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{2,6}$/im
  }

  User.getCredentials = function () {
    let credentials = []
    for (let profile of this.Profiles) {
      for (let credential of profile.Credentials) {
        credentials.push(credential.name)
      }
    }
    return credentials
  }

  return User
}
