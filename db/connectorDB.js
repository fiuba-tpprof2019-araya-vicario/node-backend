import Sequelize from 'sequelize'
import { DB_CONNECTION } from './config/config'

let sequelize

const connect = () => {
  console.log(DB_CONNECTION)
  sequelize = new Sequelize(DB_CONNECTION)
  sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch(err => console.error('Unable to connect to the database:', err))
}

export { connect, sequelize }
