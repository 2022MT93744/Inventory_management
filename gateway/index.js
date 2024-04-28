const express=require('express');
const app=express();
const port= 8000;
const {Pool,Client}= require('pg')
const bodyParser=require('body-parser'); 

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

const cors = require("cors");
const proxy = require("express-http-proxy");
app.use(cors());


app.use("/order", proxy("http://localhost:8002"));
app.use("/payment", proxy("http://localhost:8003"));
app.use("/", proxy("http://localhost:8001")); // Base Inventory



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  });