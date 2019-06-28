
export function up (queryInterface) {
  return queryInterface.bulkInsert('Profiles', [{
    name: 'Admin',
    description: 'Administrador general'
  },
  {
    name: 'Estudiante',
    description: 'Estudiante FIUBA'
  },
  {
    name: 'Tutor',
    description: 'Docente Tutor FIUBA'
  },
  {
    name: 'Comision',
    description: 'Comision Curricular FIUBA'
  },
  {
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
