
export function up (queryInterface) {
  return queryInterface.bulkInsert('Credentials', [{
    id: 1,
    name: 'GET_USERS',
    description: 'Posibilidad de obtener información de los usuarios',
  },
  {
    id: 2,
    name: 'EDIT_USERS',
    description: 'Posibilidad de editar los datos de usuarios',
  },
  {
    id: 3,
    name: 'GET_PROFILES',
    description: 'Posibilidad de obtener información de los perfiles',
  },
  {
    id: 4,
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
