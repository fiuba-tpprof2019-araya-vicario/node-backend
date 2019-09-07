
export function up (queryInterface) {
  return queryInterface.bulkInsert('Careers', [{
    name: 'Ingeniería en Informática',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería Civil',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería Electrónica',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería Química',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería de Alimentos',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería Electricista',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería en Agrimensura',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería en Petróleo',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería Industrial',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería Mecánica',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Ingeniería Naval y Mecánica',
    description: '',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Lic. en Análisis de Sistemas',
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
