
export function up (queryInterface) {
  return queryInterface.bulkInsert('Profiles', [{
    id: 1,
    name: 'Admin',
    description: 'Administrador general'
  },
  {
    id: 2,
    name: 'Estudiante',
    description: 'Estudiante FIUBA'
  },
  {
    id: 3,
    name: 'Tutor',
    description: 'Docente Tutor FIUBA'
  },
  {
    id: 4,
    name: 'Comision',
    description: 'Comision Curricular FIUBA'
  },
  {
    id: 5,
    name: 'Interesado',
    description: 'Intermediario perfil externo'
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
