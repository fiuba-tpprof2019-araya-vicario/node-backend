export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_type_transactions', [{
    project_type: 1,
    primary_state: 1,
    secondary_state: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 1,
    primary_state: 2,
    secondary_state: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 1,
    primary_state: 3,
    secondary_state: 4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 1,
    primary_state: 4,
    secondary_state: 5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 1,
    primary_state: 5,
    secondary_state: 6,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 1,
    primary_state: 6,
    secondary_state: 7,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 2,
    primary_state: 1,
    secondary_state: 2,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 2,
    primary_state: 2,
    secondary_state: 3,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 2,
    primary_state: 3,
    secondary_state: 4,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 2,
    primary_state: 4,
    secondary_state: 5,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    project_type: 2,
    primary_state: 5,
    secondary_state: 6,
    created_at: new Date(),
    updated_at: new Date()
  }], {})
}
export function down () {
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('Person', null, {})
  */
}
