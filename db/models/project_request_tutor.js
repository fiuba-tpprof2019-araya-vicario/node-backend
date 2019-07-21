import { ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectRequestTutor = sequelize.define('ProjectRequestTutor', {
    status: {
      type: ENUM,
      values: ['pending', 'accepted', 'rejected']
    },
    type: {
      type: ENUM,
      values: ['tutor', 'cotutor']
    }
  }, {
    underscored: true,
    tableName: 'Project_request_tutors'
  })

  return ProjectRequestTutor
}
