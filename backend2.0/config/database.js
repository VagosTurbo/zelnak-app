import dotenv from "dotenv"
import mysql from "mysql2/promise"


dotenv.config()

console.log("\n***** Database configuration: *****")
console.log("DB_HOST: ", process.env.DB_HOST)
console.log("DB_USER: ", process.env.DB_USER)
console.log("DB_PASSWORD: ", process.env.DB_PASSWORD)
console.log("DB_DATABASE: ", process.env.DB_DATABASE)
console.log("************************************")

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE   
});

export default db;