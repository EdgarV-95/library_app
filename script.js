const myLibrary = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.changeStatus = () => {
        if(this.read === false) this.read = true
        else this.read = false
    }
}

const lotr = new Book(`Title: Lord of the Rings`, `Author: J.R.R. Tolkein`, `Pages: 310`, `Read: true`)
const dune = new Book(`Title: Dune`, `Author: Frank Herbert`, `Pages: 412`, `Read: true`)
const legend = new Book(`Title: I Am Legend`, `Author: Richard Matheson`, `Pages: 160`, `Read: true`)
myLibrary.push(lotr)
myLibrary.push(dune)
myLibrary.push(legend)

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
    newDiv.setAttribute(`data-id`, `${myLibrary.length-1}`)
    newDiv.innerHTML = 
    `<p class="title">Title: ${lastItem.title}</p>
    <p class="author">Author: ${lastItem.author}</p>
    <p class="pages">Pages: ${lastItem.pages}</p>
    <p class="read" data-id=${myLibrary.length-1}>Read: ${lastItem.read}</p>
    <div class="book-btns">
        <img class="del" data-id=${myLibrary.length-1} src="resources/trash-can.png">
        <img class="status" data-id=${myLibrary.length-1} src="resources/toggle-switch.png">
    </div>
    `    
    document.getElementsByTagName("main")[0].appendChild(newDiv)
}

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

// Function to ADD new book
const addNewBook = () => {
    // Create a form
    const form = document.createElement('form')
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
    document.getElementsByClassName("add-btn-div")[0].append(form)

    // Run saveForm() once submit is clicked
    document.querySelector('#submit-me').addEventListener('click', saveForm)
}
const addNewBtn = document.querySelector('.add-new')
addNewBtn.addEventListener('click', addNewBook)

// Function to TOGGLE read and unread status
const toggleStatus = (e) => {
    const readDiv = document.body.querySelector('.read[data-id="' + e.target.dataset.id + '"]')
    const toggleIcon = document.body.querySelector('.status[data-id="' + e.target.dataset.id + '"]')
    const bookDiv = document.body.querySelector('.book[data-id="' + e.target.dataset.id + '"]')

    if (readDiv.innerHTML === 'Read: Completed') {
        readDiv.innerHTML = 'Read: Pending'
        toggleIcon.src = "resources/toggle-switch-off.png"
        bookDiv.style.background = "#fffbfb"

    } else {
        readDiv.innerHTML = 'Read: Completed'
        toggleIcon.src = "resources/toggle-switch.png"
        color_1 = "rgba(24, 77, 104, 0.8)"
        color_2 = "rgba(87, 202, 133, 0.8)"
        bookDiv.style.backgroundImage = "linear-gradient(135deg, "+ color_1 +"0%, "+ color_2 +"100%)"
    }
    myLibrary[e.target.dataset.id].changeStatus()
}
document.querySelector('.container').addEventListener('click', toggleStatus)

// Function to REMOVE a book
const removeBook = (e) => {
    const delBtn = document.body.querySelector('.del[data-id="' + e.target.dataset.id + '"]')
    const bookDiv = document.body.querySelector('.book[data-id="' + e.target.dataset.id + '"]')

    if(e.target === delBtn) {
        bookDiv.remove()
        myLibrary.splice(e.target.dataset.id, 1)
    }
}
document.querySelector('.container').addEventListener('click', removeBook)