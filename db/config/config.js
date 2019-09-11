import dotenv from 'dotenv-flow'

dotenv.config()

module.exports = {
  USERNAME_DB: process.env.USERNAME_DB,
  PASSWORD_DB: process.env.PASSWORD_DB,
  HOST_DB: process.env.HOST_DB,
  DATABASE: process.env.DATABASE,
  DIALECT_DB: process.env.DIALECT_DB,
  DB_CONNECTION: `${process.env.DIALECT_DB}://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.HOST_DB}:5432/${process.env.DATABASE}`
}
