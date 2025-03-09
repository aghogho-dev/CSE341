const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

let books = [];

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/new-book.html");
})


app.post("/book", (req, res) => {
  const book = req.body;
  books.push(book);
  console.log(book);
  res.send("Book is added to the database");
});


app.get("/books", (req, res) => {
    res.json(books);
});


app.get("/book/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    res.status(404).send("Book not found");
});


app.delete("/book/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }
        return false;
    });

    res.send("Book is deleted");
});


app.post("/book/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const newBook = req.body;

    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    res.send("Book is edited");
});


app.listen(port, () => {
    console.log(`Hello world app listening at http://localhost:${port}`);
})