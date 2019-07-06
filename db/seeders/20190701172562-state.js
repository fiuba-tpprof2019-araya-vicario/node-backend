export function up (queryInterface) {
  return queryInterface.bulkInsert('States', [{
    name: 'Crear idea',
    description: ''
  },
  {
    name: 'Idea en revisión',
    description: ''
  },
  {
    name: 'Pendiente de propuesta',
    description: ''
  },
  {
    name: 'Propuesta en revisión',
    description: ''
  },
  {
    name: 'Pendiente de presentación',
    description: ''
  },
  {
    name: 'Pendiente de publicación final',
    description: ''
  },
  {
    name: 'Propuesta publicada',
    description: ''
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
