let myLib = [];

//Book constructor
function Book(title, author, pages, readStatus, info) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    info = title + author + pages + readStatus;
    this.info = info;
}

//For testing
function checkInfo(Book) {
    console.log(Book.info);
}


//Variables for buttons and page
var firstAddBtn = document.getElementById("addfirst");
var introDiv = document.getElementById("intro");
var addBookCard = document.getElementById("addBookCard");
var submitBtn = document.getElementById("submitBtn");
var booksGrid = document.getElementById('booksDisp');
var secondAdd = document.getElementById('Add2');
var addClose = document.getElementById('close');

//testing info
/*
testBook = new Book("the Hobbit super long title sasdasd asdasda asdasd", "JRR Tolkein", "345", "true");
testB = new Book("LOTR", "JRR TO", "444", "false");
test = new Book('nlah', "aaaa", "22", "true");
bbb = new Book("lklklkl", "aaaa", "22", "false");
myLib = [testBook, testB, test, bbb];

myLib.forEach((book => createBookCard(book)));
addListeners();
*/


firstAddBtn.onclick = function(e) {
    introDiv.classList.remove('active');
    addBookCard.classList.add('active');
}

addClose.onclick = function(e) {
    if(myLib.length == 0) {
        addBookCard.classList.remove("active");
        introDiv.classList.add("active");
    }
    else if(myLib.length > 0){
        addBookCard.classList.remove("active");
        introDiv.classList.remove("active");
        secondAdd.classList.add("active");
    }
}

submitBtn.onclick = function(e) {
    e.preventDefault()
    secondAdd.classList.add("active");
    var title = document.getElementById("titleVal").value;
    var author = document.getElementById("authorVal").value;
    var pages = document.getElementById("pagesVal").value;
    var readStatus = document.getElementById("statusVal").checked;
    if(title != "" && author != "" && pages != "") {
        const newBook = new Book(title, author, pages, readStatus);
        myLib.push(newBook);
        console.log("libcount = " + myLib.length)
        //createBookCard(newBook);
        console.log("libcount = " + myLib.length)
        addBookCard.classList.remove("active");
        updateDisplay(myLib);
        document.getElementById('addBookForm').reset()
    }
    else {
        alert("Please fill out the form");
    }
    

}

secondAdd.onclick = function(e) {
    addBookCard.classList.add('active');
}

function createBookCard(Book) {
    
    const dispBook = document.createElement('div');
    const dispAuth = document.createElement('p');
    const dispTitle = document.createElement('p');
    const dispPages = document.createElement('p');
    const dispBtns = document.createElement('div')
    const statusBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    dispBook.classList.add('dispBook');
    dispBtns.classList.add('dispBtns');
    statusBtn.classList.add('statusBtns');
    removeBtn.classList.add('removeBtns');
    dispTitle.classList.add("dispTitle");

    dispAuth.setAttribute("id", "auth");
    dispTitle.setAttribute("id", "title");
    dispPages.setAttribute("id", "pageNum");
    statusBtn.setAttribute("id", "statusBtn");
    removeBtn.setAttribute("id", "deleteBtn");


    dispTitle.textContent = Book.title;
    dispAuth.textContent = Book.author;
    dispPages.textContent = Book.pages + " pages";

    if(Book.readStatus == "true") {
        statusBtn.textContent = "Read";
        statusBtn.classList.add("read");
    }
    else {
        statusBtn.textContent = "To Be Read";
        statusBtn.classList.add("tbr");
    }
    
    removeBtn.textContent = "Delete Book";

    dispBook.appendChild(dispTitle);
    dispBook.appendChild(dispAuth);
    dispBook.appendChild(dispPages);
    dispBook.appendChild(dispBtns)
    dispBtns.appendChild(statusBtn);
    dispBtns.appendChild(removeBtn);
    booksGrid.appendChild(dispBook);
    booksGrid.classList.add('active');
}

function addListeners() {
    //Add listeners to status buttons
    var allCardStatusBtns = document.querySelectorAll("#statusBtn");
    for(let i = 0; i < allCardStatusBtns.length; i++) {
        allCardStatusBtns[i].addEventListener('click', function() {
            //need to change status to read or unread depending
            //If read, change to unread
            console.log("CLICKED");
            if(allCardStatusBtns[i].classList.contains("read")) {
                titleList = document.getElementsByClassName("dispTitle");
                thisBook = titleList[i].textContent;
                var bookInArray = myLib.find(bookInArray => bookInArray.title == thisBook);
                console.log(bookInArray);
                bookInArray.readStatus = "false";
                console.log(bookInArray);
                allCardStatusBtns[i].classList.remove("read");
                allCardStatusBtns[i].classList.add("tbr");
                allCardStatusBtns[i].textContent = "To Be Read";
            }
            else if(allCardStatusBtns[i].classList.contains("tbr")) {
                titleList = document.getElementsByClassName("dispTitle");
                thisBook = titleList[i].textContent;
                var bookInArray = myLib.find(bookInArray => bookInArray.title == thisBook);
                console.log(bookInArray);
                bookInArray.readStatus = "true"
                console.log(bookInArray);
                allCardStatusBtns[i].classList.remove("tbr");
                allCardStatusBtns[i].classList.add("read");
                allCardStatusBtns[i].textContent = "Read";
            }
        });
    }

    //for delete buttons
    var allDeleteBtns = document.querySelectorAll("#deleteBtn");
    for(let i = 0; i < allDeleteBtns.length; i++) {
        allDeleteBtns[i].addEventListener("click", function() {
            titleList = document.getElementsByClassName("dispTitle");
            thisBook = titleList[i].textContent;
            var bookInArray = myLib.find(bookInArray => bookInArray.title == thisBook);
            indexToDelete = myLib.indexOf(bookInArray);
            console.log(indexToDelete);
            myLib.splice(indexToDelete,1);
            console.log(myLib);
            updateDisplay(myLib);
            

            //if library empty, show start card again
            if(myLib.length == 0) {
                introDiv.classList.add("active");
            }
        });

    }
}

function updateDisplay(myArray) {
    while (booksGrid.firstChild) {
        booksGrid.firstChild.remove();
    }
    myArray.forEach(book => createBookCard(book));
    addListeners();
}


    
