import express from "express"
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import errorHandler from "./errorHandler/errorHandler.js"
import loginRoutes from "./routes/loginRoutes.js"
import dotenv from "dotenv"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/events", eventRoutes)
app.use("/orders", orderRoutes)
app.use("/login", loginRoutes)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`\n***** SERVER RUNNING ON http://localhost:${PORT} *****`)
    console.log(`***************************************************`)
})
