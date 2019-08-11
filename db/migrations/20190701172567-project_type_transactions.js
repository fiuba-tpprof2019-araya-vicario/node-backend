export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Project_type_transactions', {
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    project_type: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    primary_state: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    secondary_state: Sequelize.INTEGER
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_type_transactions')
}
