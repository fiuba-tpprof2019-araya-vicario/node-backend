export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Requirements', {
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
    status: {
      type: Sequelize.ENUM,
      values: ['inactive', 'active', 'requested', 'implemented', 'deleted']
    },
    creator_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Requirements')
}
