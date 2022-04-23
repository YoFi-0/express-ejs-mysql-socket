const mysql = require("mysql2");
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_POST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

const db = (sql, array, func) =>{
    connection.getConnection((err, connect)=>{
        if(err){
            console.log(err)
            console.log('database err')
        } else {
            connect.query(sql, array, func)
            connect.release()
            connection.releaseConnection(connect)
        }
    })
}

db(`show tables`, (err, rows)=>{
    if (err) return
    console.log('db is connected')
})

module.exports = db;