import { STRING } from 'sequelize'

export default function (sequelize) {
  const Profile = sequelize.define('Profile', {
    name: {
      type: STRING,
      isUnique: true,
      validate: {
        isUnique: function (value, next) {
          var self = this
          Profile
            .find({
              where: {
                name: value
              }
            })
            .then(function (profile) {
              // reject if a different user wants to use the same profile
              if (profile && self.id !== profile.id) {
                return next('Nombre de perfil ya en uso')
              }
              return next()
            })
            .catch(function (err) {
              return next(err)
            })
        }
      }
    },
    description: STRING
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Profiles',
    indexes: [// Create a unique index
      {
        unique: true,
        fields: ['name']
      }
    ]
  })

  Profile.getMsgInexistente = function () {
    return 'Rol inexistente'
  }
  // Adding a class level method
  Profile.associate = function (models) {
    Profile.belongsToMany(models.User, {
      as: 'Users',
      through: {
        model: models.UserProfile
      },
      foreignKey: {
        name: 'profile_id',
        allowNull: true,
        unique: true
      }
    })

    Profile.belongsToMany(models.Credential, {
      as: 'Credentials',
      through: {
        model: models.ProfileCredential
      },
      foreignKey: {
        name: 'profile_id',
        allowNull: true,
        unique: true
      }
    })
  }
  return Profile
}
