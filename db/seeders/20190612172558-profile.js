
export function up (queryInterface) {
  return queryInterface.bulkInsert('Profiles', [{
    id: 1,
    name: 'Admin',
    description: 'Administrador general',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    name: 'Estudiante',
    description: 'Estudiante FIUBA',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    name: 'Tutor',
    description: 'Docente Tutor FIUBA',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 4,
    name: 'Comision',
    description: 'Comision Curricular FIUBA',
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
