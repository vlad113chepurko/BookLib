const path = require('path');
const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const booksFilePath = path.join(__dirname, 'public', 'books.json');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/books', (req, res) => {
  fs.readFile(booksFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading books file.");
    }
    try {
      const books = JSON.parse(data).books;
      res.status(200).json(books);
    } catch (e) {
      return res.status(500).send("Error parsing books data.");
    }
  });
});

app.get('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  fs.readFile(booksFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send("Server error!");
    }

    try {
      const books = JSON.parse(data).books;
      const book = books.find(b => b.id === bookId);

      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (e) {
      return res.status(500).send("Error parsing JSON");
    }
  });
});

app.delete('/booksdelete/:id', (req, res) => {
  const bookId = parseInt(req.params.id, 10);

  fs.readFile(booksFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send("Server error!");
    }

    try {
      const jsonData = JSON.parse(data);
      const books = jsonData.books;

      const bookIndex = books.findIndex(b => b.id === bookId);
      if (bookIndex === -1) {
        return res.status(404).json({ message: "Book not found" });
      }

      const deletedBook = books.splice(bookIndex, 1)[0];

      fs.writeFile(booksFilePath, JSON.stringify({ books }, null, 2), 'utf-8', (err) => {
        if (err) {
          return res.status(500).send("Error saving data.");
        }

        res.json({ message: "Book deleted", book: deletedBook });
      });
    } catch (e) {
      return res.status(500).send("Error parsing JSON");
    }
  });
});

app.post("/booksadd", (req, res) => {
  const { id, name, author, price } = req.body;

  if (!id || !name || !author || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  fs.readFile(booksFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).send("Server error!");
    }

    try {
      const jsonData = JSON.parse(data);
      const books = jsonData.books;

      books.push({ id, name, author, price });

      fs.writeFile(booksFilePath, JSON.stringify({ books }, null, 2), 'utf-8', (err) => {
        if (err) {
          return res.status(500).send("Error saving data.");
        }

        res.status(200).json({
          message: 'Book added successfully!',
          book: { id, name, author, price },
        });
      });
    } catch (e) {
      return res.status(500).send("Error parsing JSON");
    }
  });
});

app.listen(3000, () => {
  console.log(`🚀 Server is running on http://localhost:${3000}`);
});
