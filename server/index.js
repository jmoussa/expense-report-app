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
    if(err) throw err
    console.log("You are now connected to the database");
});

//Ready to parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Set default view engine
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', port);
app.use(express.static(__dirname + '/public'));

//Enable CORS
const cors = require('cors');
app.use(cors());
app.options('*', cors());

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, HEAD, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});
*/

app.get('/', function(req,res){
    return res.send({error: false, message:'hello'})
});

app.post('/', function(req,res){
  var queryString = "INSERT INTO MERCHANT(storeName, storeAddress, storePhone) VALUES ('" + req.body.storeName +  "', '" + req.body.storeAddress + "', '" + req.body.storePhone + "');";
  console.log(queryString + "\n");
  connection.query(queryString, function(err, result){
      if(err) throw err
      console.log("Query Successful...");
      
      res.send('{"status": "merchant success"}');
  });
});

app.post('/categories', function(req,res){
  var queryString = "INSERT INTO CATEGORIES(category) VALUES ('" + req.body.category + "');";
  console.log(queryString + "\n");
  connection.query(queryString, function(err, result){
      if(err) throw err
      console.log("Query Successful...");
      
      res.send('{"status": "category success"}');
  });
});

app.listen(port);
console.log("server started at localhost:3001");
