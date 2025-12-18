let borrowed = [];
let books = ["Book1","Book2"];

function borrow(book) {
    console.log("enter book to borrow: ")
    console.log(`you have borrowed ${books[book]}`)
    borrowed.push(books.splice(book, 1)[0])
    console.log("books available:",books,"\n")
    console.log("borrowed books:",borrowed,"\n")
}   

function returnBook(book) {
    console.log("enter book to return: ")
    console.log(`you have return ${borrowed[book]}`)
    books.push(borrowed.splice(book, 1)[0])
    console.log("books available:",books,"\n")
    console.log("borrowed books:",borrowed,"\n")
}

borrow(0)
returnBook(0)

