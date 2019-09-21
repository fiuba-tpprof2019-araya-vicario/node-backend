export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Project_request_students', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: Sequelize.ENUM,
      values: ['pending', 'accepted', 'rejected']
    },
    accepted_proposal: {
      type: Sequelize.ENUM,
      values: ['pending', 'accepted', 'rejected']
    },
    project_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Projects',
        key: 'id'
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_request_students')
}
