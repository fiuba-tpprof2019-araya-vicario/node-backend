
export function up (queryInterface) {
  return queryInterface.bulkInsert('Departments', [{
    name: 'Departamento Informática',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Departamento Civil',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Departamento Electrónica',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Departamento Química',
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
