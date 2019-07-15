import { STRING, TEXT } from 'sequelize'

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    name: {
      type: STRING,
      isUnique: true,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: TEXT,
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
    Project.belongsTo(models.User, {
      as: 'Creator',
      foreignKey: {
        name: 'creator_id',
        allowNull: false,
        unique: true
      }
    })

    Project.belongsTo(models.User, {
      as: 'Tutor',
      foreignKey: {
        name: 'tutor_id',
        allowNull: false,
        unique: true
      }
    })

    Project.belongsTo(models.ProjectType, {
      as: 'Type',
      foreignKey: {
        name: 'type_id',
        allowNull: false,
        unique: true
      }
    })

    Project.belongsTo(models.State, {
      as: 'State',
      foreignKey: {
        name: 'state_id',
        allowNull: false,
        unique: true
      }
    })

    Project.belongsToMany(models.User, {
      as: 'Students',
      through: {
        model: models.ProjectStudent
      }
    })

    Project.belongsToMany(models.User, {
      as: 'Cotutors',
      through: {
        model: models.ProjectCotutor
      }
    })

    Project.hasMany(models.ProjectHistory, {
      as: 'ProjectHistory'
    })
  }

  return Project
}
