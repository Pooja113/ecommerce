const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error")
const cookiePareser = require("cookie-parser");

app.use(express.json());
app.use(cookiePareser());

//Router Imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute')

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

//Middleware
app.use(errorMiddleWare);



module.exports = app 