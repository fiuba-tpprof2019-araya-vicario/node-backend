import { STRING } from 'sequelize'

const STATES = {
  INIT_IDEA: 1,
  PENDING_DOC: 2,
  PENDING_REV: 3
}

module.exports = (sequelize) => {
  const State = sequelize.define('State', {
    name: STRING,
    description: STRING
  }, {
    timestamps: true,
    underscored: true,
    tableName: 'States'
  })

  State.getMaxStateAcceptRequest = function () {
    return STATES.PENDING_DOC
  }

  return State
}
