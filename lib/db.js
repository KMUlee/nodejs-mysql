var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: 'node-mysql'
})

db.connect();

module.exports = db;