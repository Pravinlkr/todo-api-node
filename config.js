const mysql = require('mysql');

// create connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'java@123',
    database: 'learnnode'
});

// check connection
connection.connect((err) => {
    if(err) {
        console.error(err);
    } else {
        console.log('connected')
    }
})

module.exports = connection