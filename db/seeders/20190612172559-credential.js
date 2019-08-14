
export function up (queryInterface) {
  return queryInterface.bulkInsert('Credentials', [{
    name: 'CREATE_PROJECT',
    description: 'Posibilidad de crear proyectos',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'EDIT_PROJECT',
    description: 'Posibilidad de editar sus proyectos',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'GET_PROJECTS',
    description: 'Posibilidad de obtener sus proyectos',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'CREATE_USER',
    description: 'Posibilidad de crear usuarios',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'GET_USERS',
    description: 'Posibilidad de obtener información de los usuarios',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'EDIT_USERS',
    description: 'Posibilidad de editar los datos de usuarios',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'CREATE_PROFILE',
    description: 'Posibilidad de crear perfiles',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'GET_PROFILES',
    description: 'Posibilidad de obtener información de los perfiles',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'EDIT_PROFILES',
    description: 'Posibilidad de editar los datos de un perfil',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'GET_REQUIREMENTS',
    description: 'Posibilidad de obtener los requerimientos',
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
