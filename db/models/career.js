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

    Career.hasMany(models.ProjectCareer, {
      foreignKey: 'career_id'
    })
  }
  return Career
}
