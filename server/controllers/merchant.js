const Location = require('../models/locations')
const Merchant = require('../models/merchants')
const Category = require('../models/categories')
const Transaction = require('../models/transactions')

var createMerchantAndLocation = (merchant) =>{
    let prom = new Promise((resolve,reject)=>{
        Location.findOne({
            where:{
                zipcode: merchant.zipcode
            }
        }).then(location_result=>{
            if(location_result.zipcode){
                Merchant.create({
                    store_name: merchant.store_name,
                    store_address: merchant.store_address,
                    store_phone: merchant.store_phone,
                    zipcode: location_created.zipcode
                }).then(created_merchant=>{
                    resolve(created_merchant)
                }).catch(err=>{
                    reject(err)
                })
            }else{
                Location.create({
                    zipcode: merchant.zipcode,
                    city: merchant.city,
                    state: merchant.state,
                }).then(location_created=>{
                    Merchant.create({
                        store_name: merchant.store_name,
                        store_address: merchant.store_address,
                        store_phone: merchant.store_phone,
                        zipcode: location_created.zipcode
                    }).then(created_merchant=>{
                        resolve(created_merchant)
                    }).catch(err=>{
                        reject(err)
                    })
                })
            }
        })
    })
    return prom
}

module.exports = {
    createMerchantAndLocation
}