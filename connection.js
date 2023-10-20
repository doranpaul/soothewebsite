let mysql  = require('mysql');
let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soothe_db',
    port: '3306' 
});

db.connect((err)=> {
    if(err) throw err;
});

module.exports = db;
console.log("Connected to Soothe DB");