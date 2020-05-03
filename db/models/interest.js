import { STRING, TEXT } from 'sequelize'

module.exports = (sequelize) => {
  const Interest = sequelize.define('Interest', {
    name: {
      type: STRING,
      isUnique: true,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: TEXT
    }
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'Interests'
  })

  // Adding a class level method
  Interest.associate = function (models) {
    Interest.hasMany(models.UserInterest, {
      foreignKey: 'interest_id'
    })
  }
  return Interest
}
