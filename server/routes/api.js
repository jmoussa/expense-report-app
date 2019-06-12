const express = require('express')

const Location= require('../models/locations')
const Merchant = require('../models/merchants')
const Category = require('../models/categories')
const Transaction = require('../models/transactions')
const Product = require('../models/products')

const config = require('../models/config')
const sequelize = config.connection

sequelize.sync().then(()=>{
    console.log('Synced DB')
}).catch(err=>{
    console.log(err)
});

const router = express.Router()

const MerchantController = require('../controllers/merchant')
const CategoryController = require('../controllers/category')
const TransactionController = require('../controllers/transaction')
const ProductController = require('../controllers/product')



/*
{
    store_name
    store_address
    store_phone
    zipcode
    city
    state
}
*/
router.post('/createMerchant', (req,res)=>{
    MerchantController.createMerchantAndLocation(req.body).then(result=>{
        res.send(result.dataValues)
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/getMerchants', (req,res)=>{
    Merchant.findAll({
        include: [
            {model: Location, as:'merchantLocation'}
        ]
    }).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
})

/*
{
    name:
}
*/
router.post('/createCategory', (req,res)=>{
    CategoryController.createCategory(req.body).then(result=>{
        res.send(result.dataValues)
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/getCategories', (req,res)=>{
    Category.findAll({
    }).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
})

/*
{
    amount
    date
    category_id
    merchant_id
}
*/
router.post('/createTransaction', (req,res)=>{
    Transaction.create(req.body).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.send(err)
    })
})
router.post('/getTransactions', (req,res)=>{
    Transaction.findAll({
        include: [
            {model: Category, as: 'transactionCategory'},
            {model: Merchant, as: 'transactionMerchant'}
        ]
    }).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.send(err)
    })
})

/*
    name
    merchant_id
    transaction_id
*/
router.post('/createProduct', (req,res)=>{
    Product.create(req.body).then(result=>{
        res.send(result)
    }).catch(err=>{
        res.send(err)
    })
})
router.get('/getProducts', (req,res)=>{
    Product.findAll({
        include: [
            {
                model: Transaction, 
                as: 'productTransaction', 
                include: [
                    {model: Category, as: 'transactionCategory'},
                    {model: Merchant, as: 'transactionMerchant'}
                ]
            },
            {
                model: Merchant,
                as: 'productMerchant',
                include: [
                    {model: Location, as:'merchantLocation'}
                ]
            }
        ]
    }).then(results=>{
        res.send(results)
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router