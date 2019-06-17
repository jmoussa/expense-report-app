const Sequelize = require('sequelize')
const uuid = require('uuid/v4')
const config = require('./config')
const sequelize = config.connection

const Category = require('./categories')
const Merchant = require('./merchants')

const Transaction = sequelize.define('transaction', {
    id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: ()=>uuid()
    },
    amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2)
    },
    date: {
        allowNull: false,
        type:Sequelize.DATEONLY
    },
    category_id: {
        allowNull: false,
        type: Sequelize.UUID
    },
    merchant_id: {
        allowNull: false,
        type: Sequelize.UUID
    }
})

Category.hasMany(Transaction, {as: 'transactionCategory', foreignKey: 'category_id', onDelete: 'CASCADE'})
Transaction.belongsTo(Category, {as: 'transactionCategory', foreignKey: 'category_id'})

Merchant.hasMany(Transaction, {as: 'transactionMerchant', foreignKey: 'merchant_id', onDelete:'CASCADE'})
Transaction.belongsTo(Merchant, {as: 'transactionMerchant', foreignKey: 'merchant_id'})

module.exports = Transaction 