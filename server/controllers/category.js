const Location = require('../models/locations')
const Merchant = require('../models/merchants')
const Category = require('../models/categories')
const Transaction = require('../models/transactions')

var createCategory = (category) =>{
    let prom = new Promise((resolve,reject)=>{
        Category.findOne({
            where: {
                name: category.name
            }
        }).then(result=>{
            if(result.name){
                resolve(result)
            }else{
                Category.create(category).then(new_result=>{
                    resolve(new_result)
                }).catch(err=>{
                    reject(err)
                })
            }
        }).catch(err=>{
            reject(err)
        })
    })
    return prom
}

module.exports = {
    createCategory
}