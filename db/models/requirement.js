import { STRING, TEXT } from 'sequelize'

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
