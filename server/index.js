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

//Set default view engine 
//Not needed since we're using react for the view layer
/*
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', port);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    return res.send({error: false, message:'hello'})
});
*/

app.post('/', function(req,res){
  console.log("--------------------MERCHANT------------------------");
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

app.post('/categories', function(req,res){
  console.log("--------------------CATEGORIES------------------------");
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

app.post('/products', function(req, res){
  console.log("----------------------PRODUCTS--------------------------");
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

app.post('/transactions', function(req,res){
  console.log("---------------TRANSACTIONS-------------------");
  var storeID;
  var categoryID;

  var query1 = "SELECT * FROM MERCHANT WHERE storeName = '" + req.body.storeName + "'";
  var query2 = "SELECT * FROM CATEGORIES WHERE category = '" + req.body.category + "'";
  var queryString = "INSERT INTO TRANSACTIONS(storeID, amount, date, categoryID) VALUES ?";
  
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
        [storeID, req.body.amount, req.body.date, categoryID]
      ];

      connection.query(queryString, [values], function(err, result){
        if(err) throw err;
        console.log("Query Successful...");
        res.send('{"status": "transaction success"}');
      });
  });
});

app.post('/getCategories', function (req, res){
  var query = 'SELECT category FROM CATEGORIES';
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
});

app.post('/getStores', function (req, res){
  var query = 'SELECT storeName FROM MERCHANT';
  connection.query(query, function(err, rows, fields){
    if(err) throw err;
    res.send(rows);
  });
});

app.listen(port);
console.log("server started at localhost:3001");
