var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

// declare insert function to add input value to test database 
var insert = function (callback, studentName) {
  connection.query(`insert into students (name) value ("${studentName}")`, function(err, results, fields) {
    if(err) {
      throw err;
    } 
  });
}

var selectAll = function(callback) {
  connection.query('SELECT * FROM students', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.insert = insert;
// module.exports.connection = connection;
