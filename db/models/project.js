import { STRING } from 'sequelize'

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    name: {
      type: STRING,
      isUnique: true,
      validate: {
        notEmpty: true,
        isUnique: function (value, next) {
          var self = this
          Project
            .findOne({
              where: {
                name: value
              }
            })
            .then(function (project) {
              if (project && self.id !== project.id) {
                return next('Nombre ya en uso por otro proyecto')
              }
              return next()
            })
            .catch(function (err) {
              return next(err)
            })
        }
      }
    },
    description: {
      type: STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Projects'
  })

  // Adding a class level method
  Project.associate = function (models) {
    Project.belongsTo(models.ProjectType, {
      as: 'ProjectType',
      through: {
        model: models.ProjectType
      },
      foreignKey: {
        name: 'type_id',
        allowNull: false,
        unique: true
      }
    })

    Project.belongsToMany(models.User, {
      as: 'Students',
      through: {
        model: models.ProjectStudent
      },
      foreignKey: {
        name: 'user_id',
        allowNull: true,
        unique: true
      }
    })

    Project.belongsToMany(models.User, {
      as: 'Tutors',
      through: {
        model: models.ProjectTutor
      },
      foreignKey: {
        name: 'user_id',
        allowNull: true,
        unique: true
      }
    })

    Project.hasMany(models.ProjectHistory, {
      as: 'ProjectHistory'
    })
  }

  return Project
}
