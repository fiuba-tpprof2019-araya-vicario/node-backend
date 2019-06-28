
export function up (queryInterface) {
  return queryInterface.bulkInsert('Users', [{
    name: 'Sebastian',
    surname: 'Vicario',
    email: 'a@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    padron: 92223
  },
  {
    name: 'Nicolas',
    surname: 'Araya',
    email: 'b@fi.uba.ar',
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
