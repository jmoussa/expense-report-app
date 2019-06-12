const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const config = require('./config')
const sequelize = config.connection

const Location = require('./locations')

const Merchant = sequelize.define('merchant', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: ()=>uuid()
    },
    store_name: {
        type: Sequelize.STRING
    },
    store_address: {
        type:Sequelize.STRING
    },
    store_phone: {
        type: Sequelize.STRING
    },
    zipcode: Sequelize.STRING
})

Location.hasMany(Merchant, {as: 'merchantLocation', foreignKey: 'zipcode', onDelete: 'CASCADE'})
Merchant.belongsTo(Location, {as: 'merchantLocation', foreignKey: 'zipcode'})

module.exports = Merchant 