export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_types', [{
    name: 'TRABAJO_PROFESIONAL'
  },
  {
    name: 'TESIS'
  },
  {
    name: 'TRABAJO_PRACTICO'
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
