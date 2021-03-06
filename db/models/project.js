import { STRING, TEXT, BOOLEAN } from 'sequelize'

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
    },
    proposal_url: {
      type: STRING,
      validate: {
        isUrl: true,
        is: /^https:\/\/drive.google.com\/*/i
      }
    },
    proposal_drive_id: {
      type: STRING
    },
    proposal_name: {
      type: STRING,
      isUnique: true
    },
    tx_id: {
      type: STRING
    },
    proposal_visible: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Projects'
  })

  Project.prototype.inRevision = function () {
    return this.state_id === 2
  }

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
        allowNull: true,
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

    Project.belongsTo(models.Requirement, {
      as: 'Requirement',
      foreignKey: {
        name: 'requirement_id',
        allowNull: true,
        unique: true
      }
    })

    Project.belongsTo(models.Presentation, {
      as: 'Presentation',
      foreignKey: {
        name: 'presentation_id',
        allowNull: true,
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

    Project.hasMany(models.ProjectRequestTutor, {
      as: 'TutorRequests',
      foreignKey: { name: 'project_id' }
    })

    Project.hasMany(models.ProjectRequestStudent, {
      as: 'StudentRequests',
      foreignKey: { name: 'project_id' }
    })

    Project.hasMany(models.ProjectCareer, {
      foreignKey: { name: 'project_id' }
    })
  }

  return Project
}
