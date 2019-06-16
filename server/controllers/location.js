const Location = require('../models/locations')
const Merchant = require('../models/merchants')
const Category = require('../models/categories')
const Transaction = require('../models/transactions')

var createLocation = (location) => {
    let prom = new Promise((resolve, reject)=>{
        Location.findOne({
            where: {
                zipcode: location.zipcode
            }
        }).then(res=>{
            if(res && res.zipcode){
                resolve(res)
            }else{
                Location.create(location).then(result=>{
                    resolve(result)
                }).catch(err=>{
                    reject(err)
                })
            }
        })
    })
    return prom
}

module.exports = {
    createLocation
}