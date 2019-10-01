export async function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Project_careers', {
    // Timestamps
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    reject_reason: Sequelize.TEXT,
    status: {
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
    career_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      references: {
        model: 'Careers',
        key: 'id'
      }
    }
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_careers')
}
