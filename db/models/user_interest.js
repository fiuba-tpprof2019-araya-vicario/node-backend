import { FLOAT, INTEGER } from 'sequelize'

module.exports = (sequelize) => {
  const UserInterest = sequelize.define('UserInterest', {
    score: {
      type: FLOAT
    },
    original_score: {
      type: INTEGER
    }
  }, {
    underscored: true,
    tableName: 'User_interests'
  })

  UserInterest.associate = function (models) {
    UserInterest.belongsTo(models.User, {
      foreignKey: { name: 'user_id' }
    })

    UserInterest.belongsTo(models.Interest, {
      foreignKey: { name: 'interest_id' }
    })
  }

  return UserInterest
}
