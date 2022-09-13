let myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

const lotr = new Book(`Title: Lord of the Rings`, `Author: J.R.R. Tolkein`, `Pages: 310`, `Read: true`)
myLibrary.push(lotr)

const addBookToLibrary = (title, author, pages, read) => {
    const book = new Book(title, author, pages, read)
    myLibrary.push(book)
}

const displayBook = () => {
    // Gets the last item added in the myLibrary array
    const lastItem = myLibrary[myLibrary.length-1]

    // Create a new div and add the necessary html elements and fill out with the array element data
    const newDiv = document.createElement('div')
    newDiv.classList.add(`book`)
    newDiv.innerHTML = 
    `<p class="title">Title: ${lastItem.title}</p>
    <p class="author">Author: ${lastItem.author}</p>
    <p class="pages">Pages: ${lastItem.pages}</p>
    <p class="read">Read: ${lastItem.read}</p>
    <button class="del">Delete</button>
    <button class="status">Toggle</button>
    `    
    document.getElementsByTagName("main")[0].appendChild(newDiv)
}

// Function to ADD new book
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
    <div>
        <label for="read">Read: </label>
        <input type="checkbox" value="Completed" name="read" id="read" class="read">
        <label for="not-read">Not read: </label>
        <input type="checkbox" value="Pending" name="read" id="not-read" class="read">
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
const addNewBtn = document.querySelector('.add-new')
addNewBtn.addEventListener('click', addNewBook)

// Function to create a dynamic form and save it's values
const saveForm = () => {
    // Get the value of each form input and save it into a variable
    titleValue = document.querySelector('#title').value
    authorValue = document.querySelector('#author').value
    pagesValue = document.querySelector('#pages').value
    readValue = document.querySelector('.read:checked').value

    // Create a new Book object with the values
    addBookToLibrary(titleValue, authorValue, pagesValue, readValue)

    // Remove form from html after submit btn has been clicked
    document.querySelector('.create-form').remove();

    // Update the display to show the newly added book
    displayBook();
}