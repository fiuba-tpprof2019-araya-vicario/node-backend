export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_students', [{
    user_id: 1,
    project_id: 1
  },
  {
    user_id: 2,
    project_id: 1
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
