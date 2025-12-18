products = []

def displayRecords(records):
    for record in records:
        print(f"Product Name: {record["Product Name"]}")
        print(f"Product Quantity: {record["Product Quantity"]}")
        print()

def selectionSort(products, key_name):
    n = len(products)
    print("[Sorted Products]")
    for i in range(n):
        max_index = i
        for j in range(i + 1, n):
            if products[j][key_name].lower() > products[max_index][key_name].lower():
                max_index = j
        products[i], products[max_index] = products[max_index], products[i]

    if key_name == "Product Name":
        for i in range(len(products) -1, -1, -1):
            print(f"Product Name: ",products[i]["Product Name"])
            print(f"Quantity: ",products[i]["Product Quantity"])
            print("")
    else:
        for product in products:
            print(f"Product Name: ",product["Product Name"])
            print(f"Quantity: ",product["Product Quantity"])
            print("")

while True: 
    print("[1] Add a Product")
    print("[2] Undo last added Product")
    print("[3] Sort Products")
    print("[4] Search from Inventory")
    print("[5] Display all Products")
    print("[6] Exit program")

    choice = int(input("What would you like to do?"))

    if choice == 1:

        product = input("Enter Product Name: ")
        quantity = input("Enter Quantity: ")

        newRecord = {
        "Product Name":product,
        "Product Quantity":quantity,
        }

        products.append(newRecord)
        print("Product added to Inventory!")

    elif choice == 2:
        products.pop(-1)
        print("Undo last added Product successful!")

    elif choice == 3:
        choice = input("Enter(q) for quantity & (n) for name: ")

        if choice.lower() == "q":
            selectionSort(products, "Product Quantity")
        elif choice.lower() == "n":
            selectionSort(products, "Product Name")
        else:
            print("invalid input.")
                    
    elif choice == 4:
        choice = input("Enter Product Name: ")

        found = False

        for data in products:
            if choice.lower() == data["Product Name"].lower():
                print("Product Found!")
                print(f"Product Name: {data['Product Name']}")
                print(f"Product Quantity: {data['Product Quantity']}")
                found = True

        if not found:
            print("No Product with this name found!")

    elif choice == 5:
        displayRecords(products)

    elif choice == 6:
        print("Exiting program..")
        break

