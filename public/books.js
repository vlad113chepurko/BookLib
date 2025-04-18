const allBooks = document.getElementById("allBooks");
allBooks.addEventListener("click", () => {
  window.location.href = "books";
});

const inputFindBook = document.getElementById("findBook");
let inputFindBookVal = 0
inputFindBook.addEventListener('change', (e) => {
  inputFindBookVal = e.target.value;
})

const findBookBtn = document.getElementById("FindBookBtn");
findBookBtn.addEventListener("click", () => {
  if(inputFindBookVal > 0 && inputFindBookVal < 4) {
    fetch(`/books/${inputFindBookVal}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Book not found");
      }
      return res.json();
    })
    .then(book => {
      alert("Found book: ", book)
    })
    .catch(error => {
      alert(error)
    })
  } else {
    alert("Error")
  }
})

const inputDeleteBook = document.getElementById("deleteBook");
let inputDeleteBookVal = 0
inputDeleteBook.addEventListener('change', (e) => {
  inputDeleteBookVal = e.target.value;
})

const deleteBookBtn = document.getElementById("deleteBookBtn");
deleteBookBtn.addEventListener("click", () => {
  if(inputDeleteBookVal > 0 && inputDeleteBookVal < 4) {
    fetch(`/booksdelete/${inputDeleteBookVal}`, {
      method: 'DELETE'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error("Book not found")
      }
      return res.json();
    })
    .then(book => {
      alert("Deleted book: ", book)
    })
    .catch((err) => {
      alert(err)
    })
  }
})

const id_inp = document.getElementById("Id");
const name_inp = document.getElementById("Name");
const author = document.getElementById("Author");
const price = document.getElementById("Price");
const addBook = document.getElementById("addBook");

let id_val = 0;
let name_val = "";
let author_val = "";
let price_val = 0;

id_inp.addEventListener('change', (e) => {
  id_val = parseInt(e.target.value, 10);
});

name_inp.addEventListener('change', (e) => {
  name_val = e.target.value;
});

author.addEventListener('change', (e) => {
  author_val = e.target.value;
});

price.addEventListener('change', (e) => {
  price_val = parseFloat(e.target.value.replace(/[^\d.-]/g, ''));
});

addBook.addEventListener('click', () => {
  if (!id_val || !name_val || !author_val || !price_val) {
    alert("All fields must be filled!");
    return;
  }

  const bookData = {
    id: id_val,
    name: name_val,
    author: author_val,
    price: price_val,
  };

  fetch('http://localhost:3000/booksadd', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Book added:', data);
  })
  .catch(error => {
    console.error('Error adding book:', error);
  });
});
