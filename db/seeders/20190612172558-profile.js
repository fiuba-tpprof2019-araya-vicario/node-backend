
export function up (queryInterface) {
  return queryInterface.bulkInsert('Profiles', [{
    name: 'Admin',
    description: 'Administrador general',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Estudiante',
    description: 'Estudiante FIUBA',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Tutor',
    description: 'Docente Tutor FIUBA',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Comision',
    description: 'Comision Curricular FIUBA',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Interesado',
    description: 'Intermediario perfil externo',
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
