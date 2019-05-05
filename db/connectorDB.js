const Sequelize = require('sequelize')

class ConnectorDB {
  static connect () {
    const sequelize = new Sequelize(process.env.DB_CONNECTION)
    sequelize.authenticate()
      .then(() => console.log('Connection has been established successfully.'))
      .catch(err => console.error('Unable to connect to the database:', err))
  }
}

module.exports = ConnectorDB
