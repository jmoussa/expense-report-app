const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const config = require('./config')
const sequelize = config.connection

const Category = sequelize.define('category', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: ()=>uuid()
    },
    name: {
        type: Sequelize.STRING
    }
})

module.exports = Category 