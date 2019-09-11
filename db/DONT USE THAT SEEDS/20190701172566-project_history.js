export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_history', [{
    project_id: 1,
    created_by: 1,
    state_id: 1
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
