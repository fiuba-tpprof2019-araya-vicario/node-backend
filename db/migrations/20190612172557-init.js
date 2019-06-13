export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('Users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // Timestamps
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    surname: Sequelize.STRING,
    padron: Sequelize.INTEGER,
    google_id: Sequelize.STRING
  }).then(function () {
    return queryInterface.addIndex('Users', ['email'])
  }).then(function () {
    return queryInterface.createTable('Profiles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      name: Sequelize.STRING,
      description: Sequelize.STRING
    })
  }).then(function () {
    return queryInterface.createTable('Credentials', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      name: Sequelize.STRING,
      description: Sequelize.STRING
    })
  }).then(function () {
    return queryInterface.createTable('User_profile', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      profile_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER
    })
  }).then(function () {
    return queryInterface.sequelize.query('ALTER TABLE User_profile ADD CONSTRAINT user_profile_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES Profiles (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;')
  })
  .then(function () {
    return queryInterface.sequelize.query('ALTER TABLE User_profile ADD CONSTRAINT user_profile_user_id_fkey FOREIGN KEY (user_id) REFERENCES Users (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;')
  }).then(function () {
    return queryInterface.createTable('Profile_credential', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // Timestamps
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      profile_id: Sequelize.INTEGER,
      credential_id: Sequelize.INTEGER
    })
  }).then(function () {
    return queryInterface.sequelize.query('ALTER TABLE Profile_credential ADD CONSTRAINT profile_credential_credential_id_fk FOREIGN KEY (credential_id) REFERENCES Credentials (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;')
  })
  .then(function () {
    return queryInterface.sequelize.query('ALTER TABLE Profile_credential ADD CONSTRAINT profile_credential_profile_id_fk FOREIGN KEY (profile_id) REFERENCES Profiles (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;')
  })
}
export function down (queryInterface) {
  return queryInterface.dropTable('Profile_credential')
    .then(function () {
      return queryInterface.dropTable('Credentials')
    }).then(function () {
      return queryInterface.dropTable('User_profile')
    }).then(function () {
      return queryInterface.dropTable('Profiles')
    }).then(function () {
      return queryInterface.dropTable('Users')
    })
}
