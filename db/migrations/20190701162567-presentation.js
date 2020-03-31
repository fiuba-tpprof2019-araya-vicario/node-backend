export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Presentations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    description: Sequelize.TEXT,
    presentation_url: Sequelize.STRING,
    presentation_name: Sequelize.STRING,
    presentation_drive_id: Sequelize.STRING,
    presentation_visible: Sequelize.BOOLEAN,
    documentation_url: Sequelize.STRING,
    documentation_name: Sequelize.STRING,
    documentation_drive_id: Sequelize.STRING,
    documentation_visible: Sequelize.BOOLEAN,
    status: {
      type: Sequelize.ENUM,
      values: ['created', 'accepted']
    }
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Presentations')
}
