const Product = require('../models/products')

var createProduct = (product) =>{
    let prom = new Promise((resolve,reject)=>{
        Product.create(product).then(result=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        })
    })
    return prom
}

module.exports = {
    createProduct
}