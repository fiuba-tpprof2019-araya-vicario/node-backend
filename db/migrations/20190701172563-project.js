export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Projects', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    name: Sequelize.STRING,
    description: Sequelize.TEXT,
    type_id: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Project_types',
        key: 'id'
      }
    }
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Projects')
}
