import { ENUM } from 'sequelize'

module.exports = (sequelize) => {
  const ProjectRequestStudent = sequelize.define('ProjectRequestStudent', {
    status: {
      type: ENUM,
      values: ['pending', 'accepted', 'rejected']
    }
  }, {
    underscored: true,
    tableName: 'Project_request_students'
  })

  return ProjectRequestStudent
}
