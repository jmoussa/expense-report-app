var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();
var port = 3001;

//Connect to database
var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '',
  database: 'finalProject'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("You are now connected to the database");
});

//Ready to parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Enable CORS
const cors = require('cors');
app.use(cors());
app.options('*', cors());

//handle merchant information (INSERT)
app.post('/merchant', function(req,res){
  //console.log("--------------------MERCHANT------------------------");
  if(req.body.storeName != ''){
    var queryString = "INSERT INTO MERCHANT(storeName, storeAddress, storePhone) VALUES ?";
    var values = [
      [req.body.storeName, req.body.storeAddress, req.body.storePhone]
    ];
    connection.query(queryString, [values], function(err, result){
        if(err) throw err;
        console.log("Query Successful...");
        res.send('{"status": "merchant success"}');
    });
  }else{
    res.send('{"status": "merchant success"}');
  }

});

//handle category information (INSERT)
app.post('/categories', function(req,res){
  //console.log("--------------------CATEGORIES------------------------");
  var queryString = "INSERT INTO CATEGORIES(category) VALUES ?"; 
  var values = [
    [req.body.category]
  ];
  if(req.body.category != ""){
    connection.query(queryString, [values], function(err, result){
      if(err) throw err
      console.log("Query Successful...");
      res.send('{"status": "category success"}');
    });
  }else{
    res.send('{"status": "category success"}');
  }
});

//handle transaction information [SELECT (translate names to foreign keys) & INSERT]
//interpret store and category names to foreign keys
//insert transaction statement with foreign keys instead of store/category name values
app.post('/transactions', function(req,res){
  //console.log("---------------TRANSACTIONS-------------------");
  var storeID;
  var categoryID;

  var query1 = "SELECT * FROM MERCHANT WHERE storeName = '" + req.body.storeName + "'";
  var query2 = "SELECT * FROM CATEGORIES WHERE category = '" + req.body.category + "'";
  var queryString = "INSERT INTO TRANSACTIONS(storeID, amount, date, categoryID, paymentType) VALUES ?";
  
  connection.query(query1, function(err, result){
      if (err) throw err;
      storeID = result[0].mID;
  });

  connection.query(query2, function(err, result){
      if (err) throw err;
      categoryID = result[0].cID;
      console.log("CategoryID = " + categoryID);
      console.log("StoreID = " + storeID);
      
      //Final Query
      var values = [
        [storeID, req.body.amount, req.body.date, categoryID, req.body.paymentType]
      ];

      connection.query(queryString, [values], function(err, result){
        if(err) throw err;
        console.log("Query Successful...");
        res.send('{"status": "transaction success"}');
      });
  });
});

//handle individual product information (SELECT & INSERT)
//get store's primary key as a foreign key
//grab the transaction id
app.post('/products', function(req, res){
  //console.log("----------------------PRODUCTS--------------------------");
  var storeID;
  var transactionID;

  var query2 = "SELECT * FROM TRANSACTIONS WHERE tID = (SELECT MAX(tID) FROM TRANSACTIONS)";
  var queryString = "INSERT INTO PRODUCTS(productName, merchant_ID, transaction_ID) VALUES ?";
  
  connection.query(query2, function(err, result){
      if (err) throw err;
      storeID = result[0].storeID;
      
      connection.query(query2, function(error, resu){
        if (error) throw error;
        transactionID = resu[0].tID;
        //Final Query
        var values = [
          [req.body.productName, storeID, transactionID]
        ];

          connection.query(queryString, [values], function(er, rs){
            if(er) throw er;
            console.log("Query Successful...");
            res.send('{"status": "product success"}');
          });
      });
  });
});


//Grab category data
//Used to dynamically grab data for dropdown (TRANSACTION FORM)
app.post('/getCategories', function (req, res){
  var query = 'SELECT category FROM CATEGORIES';
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
});

//Grab store data
//Used to dynamically grab data for dropdown (TRANSACTION FORM)
app.post('/getStores', function (req, res){
  var query = 'SELECT storeName FROM MERCHANT';
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
});

//Get Merchant per Category
app.post('/getMPC', function(req,res){
  var query = 'SELECT TRANSACTIONS.categoryID, CATEGORIES.category FROM CATEGORIES INNER JOIN TRANSACTIONS ON CATEGORIES.cid=TRANSACTIONS.categoryID;';
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    var dataS = {
      labels:[], 
      datasets:[{
        data:[]
      }]
    };
    var idx = 0;
    var mID = 0;

    for(var i=0;i<rows.length;i++){
      if(i==0){
        dataS.labels[idx] = rows[i].category;
        dataS.datasets[0].data[idx] = ++mID;
      }else if(rows[i].categoryID == rows[i-1].categoryID){
        dataS.datasets[0].data[idx] = ++mID;
      }else if(rows[i].categoryID != rows[i-1].categoryID){
        idx++;
        mID = 0;
        dataS.labels[idx] = rows[i].category;
        dataS.datasets[0].data[idx] = ++mID;
      }
    }
    console.log("--------Data Sent-------\n", dataS);
    res.send(dataS);
  });
});
app.listen(port);
console.log("server started at localhost:", port);
