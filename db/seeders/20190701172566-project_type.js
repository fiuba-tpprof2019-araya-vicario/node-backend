export function up (queryInterface) {
  return queryInterface.bulkInsert('Project_types', [{
    id: 1,
    name: 'TRABAJO_PROFESIONAL',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    name: 'TESIS',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
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
