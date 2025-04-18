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

    if (!Array.isArray(books)) {
      console.error("Books data is not an array");
      return res.status(500).send("Books data is not an array");
    }

    const book = books.find(b => b.id === bookId);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  });
});


app.listen(3000, () => {
  console.log(`🚀 Server is running on http://localhost:${3000}`);
});

