const Sequelize = require('sequelize')
const USERNAME =  'root'
const PASSWORD =  ''
const DBNAME = 'finalProject'
const HOST = 'localhost'

const env= process.env.NODE_ENV || 'development';
const connection  = new Sequelize(DBNAME, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    logging: (env == 'development') ? true : false,
})

module.exports = {
    connection: connection
} 