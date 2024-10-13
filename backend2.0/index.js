import express from "express"
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./errorHandler/errorHandler.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use("/users", userRoutes)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`\n***** SERVER RUNNING ON http://localhost:${PORT} *****`)
    console.log(`***************************************************`)
})
