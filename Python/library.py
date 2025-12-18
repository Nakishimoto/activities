books = ["Book1", "Book2", "Book3"]
borrowed = []

def borrowBook():
    i = 0
    if len(books) != 0:
        for book in books:
            print(f"{i}. {book}")
            i += 1
        choice = int(input("Enter the number of the book you want to borrow: "))
        print(f"You have borrowed the book {books[choice]}.")
        borrowed.append(books.pop(choice))    
    else:
        print("Sorry, the library is empty.")

def returnBook():
    i = 0
    if borrowed != 0:
        for book in borrowed:
            print(f"{i}. {book}")
            i += 1
        choice = int(input("Enter the number of the book you want to return: "))
        print(f"You have returned the book {borrowed[choice]}.")
        books.append(borrowed.pop(choice))
    else:
        print("you don't posses a book borrowed from our library.")

def displayBooks():
    print("Available books:")
    
    if len(books) !=0:
        books.sort()
        print(books)
    else:
        print("there are no available books.")
    print("")
    print("borrowed books:")
   
    if len(borrowed) !=0:
        borrowed.sort()
        print(borrowed)

    else:
        print("there are no borrowed books yet.")

def main():
    while True:
        print("1. Borrow Book")
        print("2. Return Book")
        print("3. Display Books")
        print("4. Exit")
        choice = int(input("Enter your choice: "))
        
        if choice == 1:
            borrowBook()
        elif choice == 2:
            returnBook()
        elif choice == 3:
            displayBooks()
        elif choice == 4:
            break
        else:
            print("Invalid choice. Please try again.")

main()