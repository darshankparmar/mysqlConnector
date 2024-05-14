import mysql from 'mysql';

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'taskmanager'
});

connection.connect(function(error){
    if(!!error) {
        console.log(error);
    } else {
        console.log('Database Connected Successfully..!!');
    }
});

export default connection;
