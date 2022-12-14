const myLibrary = []

// Constructor function
// const personFactory = (name, age) => {
//     const sayHello = () => console.log('hello!');
//     return { name, age, sayHello };
//   };
  
//   const jeff = personFactory('jeff', 27);

// function Book(title, author, pages, read) {
//     this.title = title
//     this.author = author
//     this.pages = pages
//     this.read = read
//     this.changeStatus = () => {
//         if(this.read === false) this.read = true
//         else this.read = false
//     }
// }

// const lotr = new Book(`Title: Lord of the Rings`, `Author: J.R.R. Tolkein`, `Pages: 310`, `Read: true`)
// const dune = new Book(`Title: Dune`, `Author: Frank Herbert`, `Pages: 412`, `Read: true`)
// const legend = new Book(`Title: I Am Legend`, `Author: Richard Matheson`, `Pages: 160`, `Read: true`)


// Factory function
const book = (title, author, pages, read) => {
    const changeStatus = () => {
        if(read === false) read = true
        else read = false
    };
    return {title, author, pages, read, changeStatus}
};

const lotr = book(`Title: Lord of the Rings`, `Author: J.R.R. Tolkein`, `Pages: 310`, `Read: true`)
const dune = book(`Title: Dune`, `Author: Frank Herbert`, `Pages: 412`, `Read: true`)
const legend = book(`Title: I Am Legend`, `Author: Richard Matheson`, `Pages: 160`, `Read: true`)

myLibrary.push(lotr)
myLibrary.push(dune)
myLibrary.push(legend)

const addBookToLibrary = (title, author, pages, read) => {
    // const book = new Book(title, author, pages, read)
    // myLibrary.push(book)
    const newBook = book(title, author, pages, read)
    myLibrary.push(newBook)
}

const displayBook = () => {
    // Gets the last item added in the myLibrary array
    const lastItem = myLibrary[myLibrary.length-1]

    // Create a new div and add the necessary html elements and fill out with the array element data
    const newDiv = document.createElement('div')
    newDiv.classList.add(`book`)
    newDiv.setAttribute(`data-id`, `${myLibrary.length-1}`)
    newDiv.setAttribute(`id`, `${myLibrary.length-1}`)
    if (lastItem.read === 'Not Read') {
        newDiv.innerHTML = 
        `<p class="title">Title: ${lastItem.title}</p>
        <p class="author">Author: ${lastItem.author}</p>
        <p class="pages">Pages: ${lastItem.pages}</p>
        <p class="read" data-id=${myLibrary.length-1}>Read: ${lastItem.read}</p>
        <div class="book-btns">
            <img class="del" data-id=${myLibrary.length-1} src="resources/trash-can.png">
            <img class="status" data-id=${myLibrary.length-1} src="resources/toggle-switch-off.png">
        </div>
        `
        document.getElementsByTagName("main")[0].appendChild(newDiv)
        const newBookID = document.getElementById(`${myLibrary.length-1}`)
        color_1 = "rgba(214, 33, 33)"
        color_2 = "rgba(199, 44, 44)"
        color_3 = "rgba(58, 17, 17)"
        newBookID.style.backgroundImage = "linear-gradient(135deg, "+ color_1 +"0%, "+ color_2 +"50%, "+ color_3 + "100%)"
    } else {
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

    // Remove modal overlay after Submit is clicked
    modalBg.classList.remove('modal-active')

    // Update the display to show the newly added book
    displayBook();
}

// Function to ADD new book
const addNewBook = () => {
    // Create a form
    const form = document.createElement('form')
    form.classList.add('create-form')
    form.classList.add('modal')
    form.setAttribute('action','#')
    form.setAttribute("method", "post")
    form.innerHTML =
    `<div>
        <label for="title">*Title of book: </label>
        <input type="text" name="title" id="title" value="" required>
    </div>
    <div>
        <label for="author">*Author name: </label>
        <input type="text" name="author" id="author" value="" required>
    </div>
    <div>
        <label for="pages">*Page number: </label>
        <input type="number" name="pages" id="pages" value="" required>
    </div>
    <div class="read-btns">
        <div class="read1">
            <label for="read">Read: </label>
            <input type="checkbox" value="Completed" name="read" id="read" class="read">
        </div>
        <div class="read2">
            <label for="not-read">Not read: </label>
            <input type="checkbox" value="Not Read" name="read" id="not-read" class="read">
        </div>
    </div>
    <button type="button" form="form1" value="Submit" id="submit-me">
        Submit
    </button>
    <img class="modal-close" id="modal-close" src="resources/close.png"></img>
    `

    // FYI - I should've used <input type="submit"> instead of <button type="button" ,
    // but since the form is not connected to any database it will just throw an error
    // and crash the app

    // Place where the add new book values appears
    document.getElementsByClassName("modal-bg")[0].append(form)

    // Run saveForm() once submit is clicked
    document.querySelector('#submit-me').addEventListener('click', saveForm)

    // Remove the modal's gray overlay after the X is clicked 
    document.querySelector('#modal-close').addEventListener('click', exitOverlay)
}
const addNewBtn = document.querySelector('.modal-btn')
addNewBtn.addEventListener('click', addNewBook)

// Function to TOGGLE read and unread status
const toggleStatus = (e) => {
    const readDiv = document.body.querySelector('.read[data-id="' + e.target.dataset.id + '"]')
    const toggleIcon = document.body.querySelector('.status[data-id="' + e.target.dataset.id + '"]')
    const bookDiv = document.body.querySelector('.book[data-id="' + e.target.dataset.id + '"]')

    if (readDiv.innerHTML === 'Read: Completed') {
        readDiv.innerHTML = 'Read: Not Read'
        toggleIcon.src = "resources/toggle-switch-off.png"
        color_1 = "rgba(214, 33, 33)"
        color_2 = "rgba(199, 44, 44)"
        color_3 = "rgba(58, 17, 17)"
        bookDiv.style.backgroundImage = "linear-gradient(135deg, "+ color_1 +"0%, "+ color_2 +"50%, "+ color_3 + "100%)"

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

// Modal variables
const modalBtn = document.querySelector('.modal-btn')
const modalBg = document.querySelector('.modal-bg')
const modalClose = document.querySelector('.modal-close')

// Adds gray overlay from .modal-active to the page
modalBtn.addEventListener('click', function(){
    modalBg.classList.add('modal-active')
})

// Resets the form and removes gray overlay
const exitOverlay = () => {
    document.querySelector('.create-form').remove();
    modalBg.classList.remove('modal-active')
}