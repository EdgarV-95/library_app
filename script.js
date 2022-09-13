let myLibrary = []

function Book(title, author, pages) {
    this.title = title
    this.author = author
    this.pages = pages
}

const addBookToLibrary = (title, author, pages) => {
    const book = new Book(title, author, pages)
    myLibrary.push(book)
}

const displayBook = () => {
    // Gets the last item added in the myLibrary array
    const lastItem = myLibrary[myLibrary.length-1]

    // Create a new div and add the necessary html elements and fill out with the array element data
    const newDiv = document.createElement('div')
    newDiv.classList.add('book')
    newDiv.innerHTML = 
    `<p class="title">Title: ${lastItem.title}</p>
    <p class="author">Author: ${lastItem.author}</p>
    <p class="pages">Pages: ${lastItem.pages}</p>`
    document.getElementsByTagName("main")[0].appendChild(newDiv)
}

const addNewBook = () => {
    // Create a form
    let form = document.createElement('form')
    form.classList.add('create-form')
    form.setAttribute('action','*')
    form.setAttribute("method", "post")
    form.innerHTML =
    `<div>
        <label for="title">Title of book: </label>
        <input type="text" name="title" id="title">
    </div>
    <div>
        <label for="author">Author name: </label>
        <input type="text" name="author" id="author">
    </div>
    <div>
        <label for="pages">Page number: </label>
        <input type="number" name="pages" id="pages">
    </div>
    <button type="button" form="form1" value="Submit" id="submit-me">
        Submit
    </button>
    `
    // Place where the add new book values appears
    document.getElementsByClassName("add-btn")[0].append(form)

    // Run saveForm() once submit is clicked
    document.querySelector('#submit-me').addEventListener('click', saveForm)
}
// Add new book
const addNewBtn = document.querySelector('.add-new')
addNewBtn.addEventListener('click', addNewBook)

// Saves the values in the form and adds them to addBookToLibrary() where a new class is created then printed out
const saveForm = () => {
    // Get the value of each form input and save it into a variable
    titleValue = document.querySelector('#title').value
    authorValue = document.querySelector('#author').value
    pagesValue = document.querySelector('#pages').value

    // Create a new Book object with the values
    addBookToLibrary(titleValue, authorValue, pagesValue)

    // Remove form from html after submit btn has been clicked
    document.querySelector('.create-form').remove();

    // Update the display to show the newly added book
    displayBook();
}