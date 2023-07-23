const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require('./routes/auth.js')
const categoryRoutes = require('./routes/category.js')
const productRoutes = require('./routes/product.js')
const morgan = require('morgan')
const formidableMiddleware = require('express-formidable');
// import authRoutes from './routes/auth.js';
// import router from "./routes/auth.js"

const mongoose = require("mongoose");

dotenv.config();

const app = express();

// db
mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB connected"))
        .catch((err) => console.log("DB ERROR => ", err));

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(formidableMiddleware());



// router middleware
app.use("/api",authRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);


const port = process.env.PORT

app.listen(port, function(){
    console.log(`Node server is running on ${port}`);
})

