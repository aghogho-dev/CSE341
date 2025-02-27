const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");


const app = express();
const router = express.Router();


app.use(
    session({ 
        secret: "ssh", 
        saveUninitialized: true, 
        resave: false,
     })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var sess;

router.get("/", (req, res) => {
    sess = req.session;

    if (sess.email) {
        return res.redirect("/admin")
    }
    res.send("Welcome! Login");
});


router.post("/login", (req, res) => {
    sess = req.session;
    sess.email = req.body.email;

    console.log(req.body);
    console.log(sess.email);

    res.redirect("/admin");
});


router.get("/admin", (req, res) => {

    console.log("This is admin");
    
    sess = req.session;

    if (sess.email) {
        res.write(`Hello ${sess.email} <br> <a href='/logout'>Logout</a>`);
        res.end("Logout");
    } else {
        res.write("Please login first. <br> <a href='/login'>Login</a>");
        res.end("Login");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/");
    });
});


app.use("/", router);





// var express = require("express");
// var bodyParser = require("body-parser");
// var multer = require("multer");

// var app = express();
// app.use(bodyParser.json());

// var storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//         callback(null, './uploads');
//     },
//     filename: function (req, file, callback) {
//         callback(null, file.fieldname + '-' + Date.now());
//     }
// });


// var upload = multer({ storage: storage }).array('userPhoto', 2);

// app.post("/api/photo", function (req, res) {
//     upload(req, res, function (err) {
//         if (err) {
//             return res.end("Error uploading file.");
//         }
//         res.end("File is uploaded");
//     });
// });





// const mysql = require("mysql");

// const pool = mysql.createPool({
//     connectionLimit: 100,
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "database_name",
//     debug: false,
// })


// pool.query("SELECT * FROM table_name LIMIT 10", (err, rows) => {
//     if (err) {
//         console.log("Error occurred during the connction.");
//     }
//     console.log(rows[0]);
// })





app.listen(process.env.PORT || 3000, () => {
    console.log("Web Server is listening at port " + (process.env.PORT || 3000));
});