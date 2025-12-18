class Library {
    #books = []
    #borrowed = []
    
    addBook() {
        rl.question("Enter book to add: ", bookName => {
            this.#books.push(bookName.trim())
            console.log(`${bookName} has been added to books.`)
            mainMenu();
        });
    }

    borrowBook() {
        this.getBook("add").forEach((b, i) => console.log(`[${i+1}] ${b}`))
        rl.question("Which book do you want to borrow: ", num => {
            const index = parseInt(num.trim()) - 1;
            console.log(`You have borrowed ${this.#books[index]}.`)
            this.#borrowed.push(this.#books.pop([index]))
            mainMenu();
        });
    }

    getBook(option) {
        if(option === "add") {
            return this.#books;
        } else {
            return this.#borrowed;
        }
    }

    setBook(option) {
        if(option === "add") {
            return this.#books;
        } else {
            return this.#borrowed;
        }
    }
        
}

class Librarian extends Library {
    constructor(name) {
        super();
        this.name = name;
    }
}

class Person extends Librarian{

}


const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const library = new Library()
let librarian = []

function showMenu() {
    console.log("[1] Add a book")
    console.log("[2] Display books")
    console.log("[3] Borrow a book")
    console.log("[4] Return a book")
    console.log("[5] Display borrowed books")
    console.log("[6] Add a librarian")
    console.log("[7] Exit program")
}

function mainMenu() {
    showMenu();
    rl.question("Enter choice: ", choice => {
        switch(choice.trim()) {
            
            case "1":
                if(librarian.length === 0) {
                    console.log("Add a librarian first.\n")
                    mainMenu();
                    return;
                } else {
                    librarian.forEach((l, i) => console.log(`[${i+1}] ${l.name}`))
                    rl.question("Choose a Librarian for this Library: ", num => {
                        const index = parseInt(num.trim()) - 1;
                    if(librarian[index]) {
                        console.log(`You have chosen ${librarian[index].name} to be the librarian.`)
                        library.addBook()
                    } else  {
                        console.log("invalid Librarian.")
                        mainMenu();
                    }
                    });
                } 
            break;

            case "2":
                if(library.getBook("add").length === 0) {
                    console.log("there are no available books.")
                    mainMenu();
                    return;
                } else {
                    library.getBook("add").forEach((book, i) => console.log(`[${i+1}] ${book}`))
                    mainMenu();
                }
            break;

            case "3":
                if(library.getBook("add").length > 0) {
                    library.borrowBook();
                    return;
                }   else {
                    console.log("There are no books to borrow.")
                    mainMenu();
                }
                
            break;

            case "4":
                if(library.getBook("borrow").length > 0) {
                    library.getBook("borrow").forEach((book, i)=> console.log(`[${i + 1}] ${book}`))
                    rl.question("Enter book to return: ", num => {
                    console.log(`You have returned ${library.getBook("borrow")[num - 1]}.`)
                    library.getBook("add").push(library.getBook("borrow").pop([num.trim() - 1])) 
                    mainMenu(); })
                    return;
                }   else {
                    console.log("There are no borrowed books.")
                    mainMenu();
                }
                
            break;

            case "5":
                if(library.getBook("borrow").length === 0) {
                    console.log("There are no borrowed books.")
                    mainMenu();
                    return;
                }   else {
                    library.getBook("borrow").forEach((book, i) => console.log(`[${i + 1}] ${book}`))
                    mainMenu();
                }
            break;

            case "6":
                rl.question("Enter Librarian name: ", name => {
                    const l = new Librarian(name.trim());
                    librarian.push(l);
                    console.log(`${name} has been added as a librarian.\n`)
                    mainMenu();
                });
                break;
            break;

            case "7":
                console.log("Exiting program...")
                process.exit();
                break;
            break;

            default:
                console.log("invalid input.")
                mainMenu();
        }



    })
}

mainMenu();