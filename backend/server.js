const express=require("express");
const userroute=require("./routes/userroutes");
const hotelroutes=require("./routes/hotelroutes");
const bookingroutes=require("./routes/bookingroutes");
const bodyparser=require("body-parser")
const cors = require('cors');

const app=new express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Add other headers if needed
  }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/user',userroute);
app.use('/hotel',hotelroutes);
app.use('/book',bookingroutes);

app.listen(8000,()=>console.log("Server Started"));