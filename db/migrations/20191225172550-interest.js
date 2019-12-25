export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Interests', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    name: Sequelize.STRING,
    description: Sequelize.TEXT
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Interests')
}
