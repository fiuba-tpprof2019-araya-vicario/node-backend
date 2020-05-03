
export function up (queryInterface) {
  return queryInterface.bulkInsert('Interests', [{
    id: 1,
    name: 'Videojuegos',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    name: 'Machine Learning',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    name: 'Blockchain',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 4,
    name: 'Data mining',
    description: '',
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
