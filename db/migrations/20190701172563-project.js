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
    proposal_url: Sequelize.STRING,
    proposal_name: Sequelize.STRING,
    proposal_drive_id: Sequelize.STRING,
    tx_id: Sequelize.STRING,
    description: Sequelize.TEXT,
    proposal_visible: Sequelize.BOOLEAN,
    type_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      references: {
        model: 'Project_types',
        key: 'id'
      }
    },
    state_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      references: {
        model: 'States',
        key: 'id'
      }
    },
    creator_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    tutor_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    requirement_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      references: {
        model: 'Requirements',
        key: 'id'
      }
    },
    presentation_id: {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      references: {
        model: 'Presentations',
        key: 'id'
      }
    }
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Projects')
}
