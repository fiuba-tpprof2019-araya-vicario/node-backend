import { STRING, TEXT, ENUM, BOOLEAN } from 'sequelize'

module.exports = (sequelize) => {
  const Presentation = sequelize.define('Presentation', {
    description: {
      type: TEXT
    },
    status: {
      type: ENUM,
      values: ['created', 'accepted']
    },
    presentation_url: {
      type: STRING,
      validate: {
        isUrl: true,
        is: /^https:\/\/drive.google.com\/*/i
      }
    },
    presentation_drive_id: {
      type: STRING
    },
    presentation_name: {
      type: STRING,
      isUnique: true
    },
    presentation_visible: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    documentation_url: {
      type: STRING,
      validate: {
        isUrl: true,
        is: /^https:\/\/drive.google.com\/*/i
      }
    },
    documentation_drive_id: {
      type: STRING
    },
    documentation_name: {
      type: STRING,
      isUnique: true
    },
    documentation_visible: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Presentations'
  })

  // Adding a class level method
  Presentation.associate = function (models) {
    Presentation.hasOne(models.Project, {
      as: 'Project',
      foreignKey: 'presentation_id',
      onDelete: 'CASCADE'
    })
  }
  return Presentation
}
