import { STRING } from 'sequelize'

module.exports = (sequelize) => {
  const State = sequelize.define('State', {
    name: STRING,
    description: STRING
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'States'
  })

  return State
}
