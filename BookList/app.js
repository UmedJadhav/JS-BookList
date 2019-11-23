function Book(title,author,isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI(){}

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

document.getElementById('book-form').addEventListener('submit',function(e){
    const title= document.getElementById('title').value ,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;
    const book = new Book(title,author,isbn);
    const ui = new UI();
    if( title === '' || author === '' || isbn === ''){
        ui.showAlert('Fill in all the fields','error');
    }else{
        ui.addBookToList(book);
        ui.showAlert('Book added','success');
        ui.clearFields();
        e.preventDefault();
    }
});

 