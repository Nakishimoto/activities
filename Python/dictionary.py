mySet = (1 ,2 ,3 ,4 ,5 ,6,9)
mySet1 = {1 ,2 ,3 ,4, 5 ,5 ,6, 7, 8}

while True:
    choice = int(input("1: add, 2: difference, 3: intersection, 4: union, 5: exit: "))
    if choice == 1:
        element = int(input("Enter the element to add: "))
        mySet.add(element)
        print(f"Element {element} added.")
        print(mySet)
    elif choice == 2:
        element = mySet - mySet1
        print(f"Difference between sets: {element}")
    elif choice == 3:
        element = mySet & mySet1
        print(f"Intersection of sets: {element}")
    elif choice == 4:
        element = mySet | mySet1
        print(f"Union of sets: {element}")
    elif choice == 5:
        print("Exiting the program.")
        break
    else:
        print("Invalid choice. Please try again.")

