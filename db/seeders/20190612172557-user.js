
export function up (queryInterface) {
  return queryInterface.bulkInsert('Users', [{
    id: 1,
    name: 'Sebastian',
    surname: 'Vicario',
    email: 'svicario@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    padron: 92223
  },
  {
    id: 2,
    name: 'Nicolas',
    surname: 'Araya',
    email: 'naraya@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    padron: 93203
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
