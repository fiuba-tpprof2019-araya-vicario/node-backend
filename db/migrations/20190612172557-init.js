export function up (queryInterface, Sequelize) {
  return queryInterface.createTable('user', {
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
    padron: Sequelize.STRING,
    google_id: Sequelize.STRING
  }).then(function () {
    return queryInterface.sequelize.query('CREATE INDEX idx_user_email ON user (email);')
  }).then(function () {
    return queryInterface.createTable('profile', {
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
    return queryInterface.createTable('credential', {
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
    return queryInterface.createTable('user_profile', {
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
    return queryInterface.sequelize.query('ALTER TABLE user_profile ADD CONSTRAINT user_profile_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES profile (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;')
  })
    .then(function () {
      return queryInterface.sequelize.query('ALTER TABLE user_profile ADD CONSTRAINT user_profile_user_id_fkey FOREIGN KEY (user_id) REFERENCES user (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;')
    }).then(function () {
      return queryInterface.createTable('profile_credential', {
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
      return queryInterface.sequelize.query('ALTER TABLE profile_credential ADD CONSTRAINT profile_credential_credential_id_fk FOREIGN KEY (credential_id) REFERENCES credential (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;')
    })
    .then(function () {
      return queryInterface.sequelize.query('ALTER TABLE profile_credential ADD CONSTRAINT profile_credential_profile_id_fk FOREIGN KEY (profile_id) REFERENCES profile (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;')
    })
}
export function down (queryInterface) {
  return queryInterface.dropTable('profile_credential')
    .then(function () {
      return queryInterface.dropTable('credential')
    }).then(function () {
      return queryInterface.dropTable('user_profile')
    }).then(function () {
      return queryInterface.dropTable('profile')
    }).then(function () {
      return queryInterface.dropTable('user')
    })
}
