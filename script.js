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

    // Create new p tags for each object element
    let p1 = document.createElement('p')
    p1.className = 'title'
    p1.innerText = "Title: "
    p1.append(lastItem.title)

    let p2 = document.createElement('p')
    p2.className = 'author'
    p2.innerText = "Author: "
    p2.append(lastItem.author)

    let p3 = document.createElement('p')
    p3.className = 'pages'
    p3.innerText = "Pages: "
    p3.append(lastItem.pages)

    // Create a new div
    let newDiv = document.createElement("div")
    newDiv.className = 'book'
    // Add all p tags to newDiv
    newDiv.append(p1)
    newDiv.append(p2)
    newDiv.append(p3)
    // Add the newDiv to the main body
    document.getElementsByTagName("main")[0].appendChild(newDiv)
}

const addNewBook = () => {
    // Create a form
    let form = document.createElement('form')
    form.setAttribute('action','*')
    form.setAttribute("method", "post")
    form.className = 'create-form'

    // Create a div for each form input element
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    let div3 = document.createElement('div')

    // Create an input element for Title
    let titleLabel = document.createElement('label')
    titleLabel.setAttribute('for', 'title')
    titleLabel.innerText = 'Title of book: '
    let title = document.createElement('input')
    title.setAttribute('type', "text")
    title.setAttribute('name', 'title')
    title.setAttribute('id', 'title')
    form.appendChild(div1)
    div1.append(titleLabel) 
    form.appendChild(div1)
    div1.append(title)
    
    // Create an input element for Author
    let authorLabel = document.createElement('label')
    authorLabel.setAttribute('for', 'author')
    authorLabel.innerText = 'Author name: '
    let author = document.createElement('input')
    author.setAttribute('type', "text")
    author.setAttribute('name', 'author')
    author.setAttribute('id', 'author')
    form.appendChild(div2)
    div2.append(authorLabel) 
    form.appendChild(div2)
    div2.append(author)

    // Create an input element for Pages
    let pagesLabel = document.createElement('label')
    pagesLabel.setAttribute('for', 'pages')
    pagesLabel.innerText = 'Page number: '
    let pages = document.createElement('input')
    pages.setAttribute('type', "number")
    pages.setAttribute('name', 'pages')
    pages.setAttribute('id', 'pages')
    form.appendChild(div3)
    div3.append(pagesLabel) 
    form.appendChild(div3)
    div3.append(pages)

    // Create a submit button
    let submit = document.createElement("button")
    submit.setAttribute("type", "button")
    submit.setAttribute('form', 'form1')
    submit.setAttribute("value", "Submit")
    submit.setAttribute('id', 'submit-me')
    submit.innerText = 'Submit'
    form.append(submit)

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






