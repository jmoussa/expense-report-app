const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const config = require('./config')
const sequelize = config.connection

const Location = sequelize.define('location', {
    zipcode: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
    },
    city: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    }
})

module.exports = Location 