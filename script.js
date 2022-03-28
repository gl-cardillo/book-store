const bookSection = document.querySelector('.books');
const booksSkeleton = document.createElement('div');

const addBook = document.querySelector('.add-book');
const bookForm = document.querySelector('.book-form');
const cancelAddBook = document.querySelector('.cancel-form')
addBook.addEventListener('click', () => bookForm.style.display = 'flex');
cancelAddBook.addEventListener('click', () => bookForm.style.display = 'none');

const LOCAL_STORAGE_BOOK_KEY = 'book.storage';
let myLibrary = JSON.parse(localStorage.getItem(LOCAL_STORAGE_BOOK_KEY)) || [];
// object for the book
function book(name, author, pages, read) {
  this.name = name
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`
  }
}

//create new book, reset the form, and add the book to the array, call showbooks for update the library
function addBookToLibrary () {
  const name = document.querySelector('#name').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const read = document.querySelector('#read').checked
  let newBook = new book (name, author, pages, read);
  bookForm.style.display = 'none';
  bookForm.reset();
  myLibrary.push(newBook);
  save();
  showBooks()
}

const bookContainer = document.querySelector('.book-container');

const showBooks = () => {

  bookContainer.textContent = ''
  for (let i = 0; i < myLibrary.length ; i++) {  
    //create skeleton for book
    const removeBook = document.createElement('p');
    const author = document.createElement('p');
    const title = document.createElement('p');
    const pages = document.createElement('p');
    const read = document.createElement('button')
    read.classList.add("book-button");
    //if book already read or not set correct text and color
    if (myLibrary[i].read) {
       read.style.backgroundColor = "green";
       read.textContent = " already read";
       
    } else {
      read.style.backgroundColor = "red"
      read.textContent = "to read";
    }
    
    read.addEventListener('click', toogleRead);
    // create button for remove book
    removeBook.textContent = "X";
    removeBook.style.color = "red";
    removeBook.addEventListener('click', remove )
    removeBook.setAttribute('id', i);
    // get data from the form
    title.textContent = myLibrary[i].name;
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages;
 
    const books = document.createElement('div');
    books.classList.add('book');
    
    books.appendChild(removeBook);
    
    books.appendChild(title);
    books.appendChild(author)
    books.appendChild(pages);
    books.appendChild(read);
    
    bookContainer.appendChild(books);
 
  }
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_BOOK_KEY, JSON.stringify(myLibrary))
}

const readOrNot = document.querySelector('.book-button')

const toogleRead = (e) => {
  if (e.target.textContent === "to read") {
     e.target.textContent = "read";
     e.target.style.backgroundColor = "green";
  } else {
    e.target.textContent = "to read";
    e.target.style.backgroundColor = "red";
  }
}

const remove = (e) => {
  myLibrary.splice(e.target.id, 1);
  save();
  showBooks();
}

showBooks();