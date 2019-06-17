const Location = require('../models/locations')
const Merchant = require('../models/merchants')
const Category = require('../models/categories')
const Transaction = require('../models/transactions')

var createTransaction = (transaction) =>{
    let prom = new Promise((resolve,reject)=>{
        Transaction.create(transaction).then(result=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        })
    })
    return prom
}

module.exports = {
    createTransaction
}