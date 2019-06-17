const Sequelize = require('sequelize')

const DBconf = require('../.config.js')


const USERNAME = DBconf.user 
const PASSWORD = DBconf.password 
const DBNAME = DBconf.database 
const HOST = DBconf.host 

const env = process.env.NODE_ENV || 'development';
const connection  = new Sequelize(DBNAME, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    logging: (env == 'development') ? true : false,
})

module.exports = {
    connection: connection
} 
