import mysql from "mysql2/promise"

const pool = mysql.createPool({
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    host : process.env.MYSQL_HOST,
    database : process.env.MYSQL_DATABASE,
    waitForConnections : true,
})

export default pool;