var mysql = require('mysql');
var conn = mysql.createConnection({
    host: "localhost",
    user: "geo",
    password: "root",
    database: "Quick_HR_RS"
});

conn.connect((err)=> {
    if(!err)
        console.log('Connected to database successfully');
    else
        console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

module.exports = conn;