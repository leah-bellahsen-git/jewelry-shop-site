
require("dotenv").config()
const express = require("express")
const cors = require("cors")

const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/dbConn")
const { default: mongoose } = require("mongoose")

const PORT = process.env.PORT || 5555
const app = express()
connectDB()
//middleware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))

app.use("/api/user", require("./router/userRoute"))
app.use("/api/product", require("./router/productRoute"))
app.use("/api/auth", require("./router/authRoute"))
app.use("/api/order", require("./router/orderRoute"))

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})

})

mongoose.connection.on('error', err=>{
    console.log(err);
})


