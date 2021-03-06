export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Project_cotutors', {
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
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
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_cotutors')
}
