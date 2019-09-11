import { STRING, TEXT } from 'sequelize'

module.exports = (sequelize) => {
  const Career = sequelize.define('Career', {
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
    tableName: 'Careers'
  })

  // Adding a class level method
  Career.associate = function (models) {
    Career.belongsToMany(models.User, {
      as: 'Users',
      through: {
        model: models.UserCareer
      }
    })

    Career.belongsToMany(models.Credential, {
      as: 'Projects',
      through: {
        model: models.ProjectCareer
      }
    })
  }
  return Career
}
