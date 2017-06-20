var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
// var items = require('../database-mongo');
var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))
// parse application/json 
app.use(bodyParser.json())
// var connection = require('../database-mysql'); 


// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));


// app.post('/', function(req, res) {

// var jsondata = req.body;
// var values = [];



app.post('/items', function (req, res) {
  // grab the input value 
  // var studentName = req.body.firstName;
  // console.log(req.body);
  // save it into the database  
  items.insert(function(err, data) {
    if(err) {
      res.sendStatus(500); 
    } 
  }, req.body);
  res.send('YES it works!');
})


app.delete('/items', function (req, res) {
  // console.log('REQ BODY SHOULD BE INPUT:',req.body.deleteName);
  var inputValue = req.body.deleteName; 
  items.deleteData(function(err, data) {
    if(err) {
      res.sendStatus(500); 
    } 
  }, inputValue );
  res.send('processing');
})


app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

