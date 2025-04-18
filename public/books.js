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
      console.log("Found book: ", book);
    })
    .catch(error => {
      console.error(error);
    })
  } else {
    console.error("Error");
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
      console.log("Deleted book: ", book);
    })
    .catch((err) => {
      console.error(err);
    })
  }
})

