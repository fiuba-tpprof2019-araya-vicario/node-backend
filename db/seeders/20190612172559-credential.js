// 'CREATE_PROJECTS' 1
// 'EDIT_PROJECTS' 2
// 'GET_PROJECTS' 3
// 'EDIT_USERS' 4
// 'GET_USERS' 5
// 'EDIT_PROFILES' 6
// 'GET_PROFILES' 7
// 'EDIT_TUTOR_REQUESTS 8
// 'APPROVE_PROJECTS 9
// 'EDIT_REQUIREMENTS 10
// 'GET_REQUIREMENTS 11

export function up (queryInterface) {
  return queryInterface.bulkInsert('Credentials', [{
    id: 1,
    name: 'CREATE_PROJECTS',
    description: 'Posibilidad de crear proyectos',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 2,
    name: 'EDIT_PROJECTS',
    description: 'Posibilidad de administrar sus proyectos',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 3,
    name: 'GET_PROJECTS',
    description: 'Posibilidad de obtener sus proyectos',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 4,
    name: 'EDIT_USERS',
    description: 'Posibilidad de administrar usuarios',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 5,
    name: 'GET_USERS',
    description: 'Posibilidad de obtener información de los usuarios',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 6,
    name: 'EDIT_PROFILES',
    description: 'Posibilidad de administrar perfiles',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 7,
    name: 'GET_PROFILES',
    description: 'Posibilidad de obtener información de los perfiles',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 8,
    name: 'EDIT_TUTOR_REQUESTS',
    description: 'Posibilidad de administrar tutorías',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 9,
    name: 'APPROVE_PROJECTS',
    description: 'Posibilidad de administrar aprobaciones de proyectos',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 10,
    name: 'EDIT_REQUIREMENTS',
    description: 'Posibilidad de administrar los requerimientos',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    id: 11,
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
