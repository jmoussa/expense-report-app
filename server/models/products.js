const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const config = require('./config')
const sequelize = config.connection

const Transaction = require('./transactions')
const Merchant = require('./merchants')

const Product = sequelize.define('product', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: ()=>uuid()
    },
    name: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
    },
    transaction_id: {
        allowNull: false,
        type:Sequelize.UUID
    },
    merchant_id: {
        allowNull: false,
        type: Sequelize.UUID
    }
})

Merchant.hasMany(Product, {as: 'productMerchant', foreignKey: 'merchant_id', onDelete: 'CASCADE'})
Product.belongsTo(Merchant, {as: 'productMerchant', foreignKey: 'merchant_id'})

Transaction.hasMany(Product, {as: 'productTransaction', foreignKey: 'transaction_id', onDelete:'CASCADE'})
Product.belongsTo(Transaction, {as: 'productTransaction', foreignKey: 'transaction_id'})

module.exports = Product 