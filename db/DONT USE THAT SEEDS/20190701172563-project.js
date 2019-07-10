
export function up (queryInterface) {
  return queryInterface.bulkInsert('Projects', [{
    name: 'Brain Search',
    description: 'Proyecto sobre la trazabilidad de los distintos proyectos desarrollados para la facultad',
    type_id: 1,
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
