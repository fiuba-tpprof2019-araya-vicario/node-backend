export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_types', [{
    name: 'TRABAJO_PROFESIONAL',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'TESIS',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'TRABAJO_PRACTICO',
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
