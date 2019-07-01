export async function up (queryInterface, Sequelize) {
  return [
    await queryInterface.createTable('Project_history', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      project_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      state_id: Sequelize.INTEGER
    }),
    await queryInterface.addConstraint(
      'Project_history',
      ['project_id'],
      {
        type: 'foreign key',
        name: 'project_history_project_id_fk',
        references: {
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Project_history',
      ['user_id'],
      {
        type: 'foreign key',
        name: 'project_history_user_id_fk',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Project_history',
      ['state_id'],
      {
        type: 'foreign key',
        name: 'project_history_state_id_fk',
        references: {
          table: 'States',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    )
  ]
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_history')
}
