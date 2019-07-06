export async function up (queryInterface, Sequelize) {
  return [
    await queryInterface.createTable('Project_type_transactions', {
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      project_type_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      primary_state_id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      secondary_state_id: Sequelize.INTEGER
    }),
    await queryInterface.addConstraint(
      'Project_type_transactions',
      ['project_type_id'],
      {
        type: 'foreign key',
        name: 'project_type_transaction_project_type_id_fk',
        references: {
          table: 'Project_types',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Project_type_transactions',
      ['primary_state_id'],
      {
        type: 'foreign key',
        name: 'project_type_transaction_primary_state_id_fk',
        references: {
          table: 'States',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Project_type_transactions',
      ['secondary_state_id'],
      {
        type: 'foreign key',
        name: 'project_type_transaction_secondary_state_id_fk',
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
  return queryInterface.dropTable('Project_type_transactions')
}
