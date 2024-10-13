import dotenv from "dotenv"
import { createConnection } from "mysql2"

dotenv.config()

console.log("\n***** Database configuration: *****")
console.log("DB_HOST: ", process.env.DB_HOST)
console.log("DB_USER: ", process.env.DB_USER)
console.log("DB_PASSWORD: ", process.env.DB_PASSWORD)
console.log("DB_DATABASE: ", process.env.DB_DATABASE)
console.log("************************************")

const db = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})

db.connect((err) => {
    console.log("\n***** Connecting to MySQL database *****")

    if (err) {
        console.error("Error connecting to MySQL database:", err.message)
        console.log("****************************************")
        process.exit(1)
    } else {
        console.log("Connected to MySQL database")
        console.log("****************************************")
    }
})

const query = db
export default query
