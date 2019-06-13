import { STRING, INTEGER } from 'sequelize'

export default function (sequelize) {
  var User = sequelize.define('User', {
    email: {
      type: STRING,
      allowNull: false,
      isUnique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
        len: [
          1, 255
        ],
        isUnique: function (value, next) {
          var self = this
          User
            .find({
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
    google_id: {
      type: STRING,
      validate: {
        notEmpty: true
      }
    }
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
      },
      foreignKey: {
        name: 'user_id',
        allowNull: true,
        unique: true
      }
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

  User.obtenerPermisos = function () {
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
