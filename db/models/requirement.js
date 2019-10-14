import { STRING, TEXT, ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const Requirement = sequelize.define('Requirement', {
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
    status: {
      type: ENUM,
      values: ['inactive', 'active', 'requested', 'implemented', 'deleted']
    },
    file_url: {
      type: STRING,
      validate: {
        isUrl: true,
        is: /^https:\/\/drive.google.com\/*/i
      }
    },
    file_drive_id: {
      type: STRING
    },
    file_name: {
      type: STRING,
      isUnique: true
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Requirements'
  })

  // Adding a class level method
  Requirement.associate = function (models) {
    Requirement.belongsTo(models.User, {
      as: 'Creator',
      foreignKey: {
        name: 'creator_id',
        allowNull: false,
        unique: true
      }
    })

    Requirement.hasOne(models.Project, {
      as: 'Project',
      foreignKey: 'requirement_id'
    })
  }
  return Requirement
}
