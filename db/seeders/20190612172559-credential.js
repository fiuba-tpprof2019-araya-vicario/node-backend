
export function up (queryInterface) {
  return queryInterface.bulkInsert('Credentials', [{
    name: 'GET_USERS',
    description: 'Posibilidad de obtener información de los usuarios',
  },
  {
    name: 'EDIT_USERS',
    description: 'Posibilidad de editar los datos de usuarios',
  },
  {
    name: 'GET_PROFILES',
    description: 'Posibilidad de obtener información de los perfiles',
  },
  {
    name: 'EDIT_PROFILES',
    description: 'Posibilidad de editar los datos de un perfil',
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
