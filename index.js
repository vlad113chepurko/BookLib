const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const data = require('./public/books.json')


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/api/books', (req, res) => {
  res.status(200).json(data);
});

app.get('/books', (req, res) => {
  res.json(data);
});

const booksFilePath = path.join(__dirname, '/public/books.json');


app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);
  fs.readFile(booksFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error!");
    }

    let books;
    try {
      const jsonData = JSON.parse(data);
      books = jsonData.books;
    } catch (e) {
      console.error("Error parsing JSON", e);
      return res.status(500).send("Error parsing JSON");
    }

    const book = books.find(b => b.id === bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
});

app.delete('/booksdelete/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  fs.readFile(booksFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Server error!");
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (e) {
      console.error("Error parsing JSON", e);
      return res.status(500).send("Error parsing JSON");
    }

    const books = jsonData.books;

    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(bookIndex, 1)[0];

    fs.writeFile(booksFilePath, JSON.stringify({ books }, null, 2), 'utf-8', (err) => {
      if (err) {
        console.error("Error", err);
        return res.status(500).send("Error");
      }

      res.json({ message: "Book deleted", book: deletedBook });
    });
  });
});


app.listen(3000, () => {
  console.log(`🚀 Server is running on http://localhost:${3000}`);
});
