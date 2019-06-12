import Sequelize from 'sequelize'
import { DB_CONNECTION } from './config/config'

class ConnectorDB {
  static connect () {
    console.log(DB_CONNECTION)
    const sequelize = new Sequelize(DB_CONNECTION)
    sequelize.authenticate()
      .then(() => console.log('Connection has been established successfully.'))
      .catch(err => console.error('Unable to connect to the database:', err))
  }
}

export default ConnectorDB
