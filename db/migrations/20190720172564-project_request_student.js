export async function up (queryInterface, Sequelize) {
  return [
    await queryInterface.createTable('Project_request_students', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: Sequelize.ENUM,
        values: ['pending', 'accepted', 'rejected']
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      project_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER
    }),
    await queryInterface.addConstraint(
      'Project_request_students',
      ['project_id'],
      {
        type: 'foreign key',
        name: 'project_request_student_project_id_fk',
        references: {
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    ),
    await queryInterface.addConstraint(
      'Project_request_students',
      ['user_id'],
      {
        type: 'foreign key',
        name: 'project_request_student_user_id_fk',
        references: {
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }
    )
  ]
}
export function down (queryInterface) {
  return queryInterface.dropTable('Project_request_students')
}