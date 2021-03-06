export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Project_history', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    project_id: Sequelize.INTEGER,
    created_by: Sequelize.INTEGER,
    state_id: Sequelize.INTEGER
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_history')
}
