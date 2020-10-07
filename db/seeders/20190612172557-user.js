
export function up (queryInterface) {
  return queryInterface.bulkInsert('Users', [{
    // Tutor
    name: 'Tutor',
    surname: 'FIUBA',
    email: 'tutor.fiuba@gmail.com',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    padron: 92223
  },
  {
    // Estudiante
    name: 'Nicolas',
    surname: 'Araya',
    email: 'naraya@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    padron: 93203
  },
  {
    // Estudiante
    name: 'Marcelo',
    surname: 'Cavazzoli',
    email: 'mcavazzoli@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    padron: 93203
  },
  {
    // Tutor
    name: 'Pablo',
    surname: 'Cosso',
    email: 'pcosso@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Tutor
    name: 'Ricardo',
    surname: 'Veiga',
    email: 'rveiga@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Tutor
    name: 'Alejandro',
    surname: 'Molinari',
    email: 'amolinari@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Comision Curricular
    name: 'Comision',
    surname: 'FIUBA',
    email: 'comisioncurricular.fiuba@gmail.com',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Estudiante
    name: 'Sebastian',
    surname: 'Cys',
    email: 'svicario@cys.com.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Sebastian',
    surname: 'Main',
    email: 'vicario.sebastian@gmail.com',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Nicolas',
    surname: 'Main',
    email: 'nwaraya@gmail.com',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Belen',
    surname: 'Lemonatio',
    email: 'belen@lemonat.io',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Tutor
    name: 'Design',
    surname: 'Lemonatio',
    email: 'design@lemonat.io',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Estudiante
    name: 'Chelo',
    surname: 'Main',
    email: 'chelinho1397@gmail.com',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Estudiante
    name: 'Creador',
    surname: 'FIUBA',
    email: 'creador.fiuba@gmail.com',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Estudiante
    name: 'Sebastian',
    surname: 'Santander',
    email: 'svicario@santanderteconologia.com.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Estudiante
    name: 'Participante',
    surname: 'FIUBA',
    email: 'alumno.invitado.fiuba@gmail.com',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Lucas',
    surname: 'Macias',
    email: 'lmacias@fi.uba.ar',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Chabeli',
    surname: 'Rodriguez',
    email: 'charodriguez@fi.uba.ar',

    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Alejandro',
    surname: 'Martinez',
    email: 'amartine@fi.uba.ar',

    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Jazmin',
    surname: 'Sofia',
    email: 'jazminsofiaf@gmail.com',
    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Tomas',
    surname: 'Zemzo',
    email: 'szemzotomas@gmail.com',

    google_id: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    // Admin
    name: 'Tomas',
    surname: 'Pinto',
    email: 'tomasp834@gmail.com',

    google_id: null,
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
