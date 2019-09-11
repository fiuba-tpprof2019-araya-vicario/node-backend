export function up (queryInterface) {
  return queryInterface.bulkInsert('States', [{
    name: 'Idea en revisión',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Pendiente de propuesta',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Propuesta en revisión',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Pendiente de presentación',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Pendiente de publicación final',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Propuesta publicada',
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
