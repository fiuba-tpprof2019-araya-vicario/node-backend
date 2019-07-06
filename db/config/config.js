import dotenv from 'dotenv'

dotenv.config()

module.exports = {
  USERNAME: process.env.USERNAME,
  PASSWORD: process.env.PASSWORD,
  HOST: process.env.HOST,
  DATABASE: process.env.DATABASE,
  DB_CONNECTION: `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
  DIALECT: process.env.DIALECT
}
