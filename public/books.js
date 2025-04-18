const allBooks = document.getElementById("allBooks");
allBooks.addEventListener("click", () => {
  window.location.href = "books";
});

const inputFindBook = document.getElementById("findBook");
let inputFindBookVal = 0
inputFindBook.addEventListener('change', (e) => {
  inputFindBookVal = e.target.value;
  console.log(inputFindBookVal);
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
    console.error("Error")
  }
})
