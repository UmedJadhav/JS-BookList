function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){}

function Storage(){}

UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class='delete'>X</a></td>
    `;   
    list.appendChild(row);
}

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

UI.prototype.clearFields= function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';   
}

UI.prototype.showAlert = function(msg ,className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div,form);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    },3000); 
}

Storage.prototype.getBooks = function(){
    let books;
    if (localStorage.getItem('books') === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books')); 
    }
    return books
}

Storage.prototype.displayBook = function(){
    const books = this.getBooks();
    books.forEach(book => {
       const ui = new UI();
        ui.addBookToList(book);
    });
}

Storage.prototype.addBook = function(book){
    const books = this.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
}

Storage.prototype.removeBook = function(isbn){
    const books = this.getBooks();
    books.forEach(function(book,index){
        if(book.isbn === isbn){
            books.splice(index,1);
        }
    localStorage.setItem('books',JSON.stringify(books));
    });
}

document.addEventListener('DOMContentLoaded',function(){
    const storage = new Storage();
    storage.displayBook();
});

document.getElementById('book-form').addEventListener('submit',function(e){
    const title= document.getElementById('title').value ,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    const book = new Book(title,author,isbn);
    const ui = new UI();
    const storage = new Storage();
    if( title === '' || author === '' || isbn === ''){
        ui.showAlert('Fill in all the fields','error');
    }else{
        ui.addBookToList(book);
        storage.addBook(book);
        ui.showAlert('Book added','success');
        ui.clearFields();
        e.preventDefault();
    }
});

document.getElementById('book-list').addEventListener('click',function(e){
    const ui = new UI();
    const storage = new Storage();
    ui.deleteBook(e.target);
    storage.removeBook(e.target.parentElement.previousElementSibling.textContent);
    ui.showAlert('Book removed','success');
    e.preventDefault();
});
 