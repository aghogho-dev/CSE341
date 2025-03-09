const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})


app.post("/quotes", (req, res) => {
    console.log("Quote posted!");
    console.log(req.body);
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
})