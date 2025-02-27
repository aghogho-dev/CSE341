require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const professionalRoute = require("./routes/professional");
const homeRoute = require("./routes/")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use("/", homeRoute);
app.use("/professional", professionalRoute);


module.exports = app;


