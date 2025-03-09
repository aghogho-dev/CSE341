const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
        res.end( data );
    });
})

app.get("/:id", (req, res) => {
    fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
        const users = JSON.parse(data);
        const user = users["user" + req.params.id];
        res.end(JSON.stringify(user));
    });
})


app.post("/", (req, res) => {
    fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
        const users = JSON.parse(data);
        const user = req.body;
        const userId = "user" + user.id;
        users[userId] = user;
        res.end(JSON.stringify(users));
    });
})


app.delete("/:id", (req, res) => {
    fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
        const users = JSON.parse(data);
        delete users["user" + req.params.id];
        res.end(JSON.stringify(users));
    });
})


app.put("/:id", (req, res) => {
    fs.readFile(__dirname + "/" + "users.json", "utf8", (err, data) => {
        const users = JSON.parse(data);
        const user = req.body;
        const userId = "user" + user.id;
        users[userId] = user;
        res.end(JSON.stringify(users));
    });
})


module.exports = app;