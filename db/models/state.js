import { STRING } from 'sequelize'

const STATES = {
  INIT_IDEA: 1,
  PENDING_DOC: 2,
  PENDING_REV: 3,
  PENDING_PRES: 4
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

  State.getMinStateApproveCommission = function () {
    return STATES.PENDING_PRES
  }

  State.pendingRevision = () => { return STATES.PENDING_REV }

  State.pendingPresentation = () => { return STATES.PENDING_REV }

  State.pendingSubmit = () => { return STATES.PENDING_REV }

  return State
}
