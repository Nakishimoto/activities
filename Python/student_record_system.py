records = []

def displayRecords(record):
    for record in records:
        print(f"Student ID: {record["studID"]}")
        print(f"Student Name: {record["Student Name"]}")
        print(f"Student Grade: {record["Student Grade"]:.1f}")
        print()

def selectionSort(records, key_name):
    n = len(records)
    print("[Sorted Records]")
    for i in range(n):
        max_index = i
        for j in range(i + 1, n):
            if key_name == "Student Name":
                if str(records[j][key_name]).lower() > str(records[max_index][key_name]).lower():
                    max_index = j
            else:
                if records[j][key_name] > records[max_index][key_name]:
                    max_index = j
        records[i], records[max_index] = records[max_index], records[i]

    if key_name == "Student Name":
        for i in range(len(records) -1, -1, -1):
            print("Student ID: ",records[i]["studID"])
            print("Student Name: ",records[i]["Student Name"])
            print("Student Grade: ",records[i]["Student Grade"])
            print("")
    else:
        for i in range(len(records)):
            print("Student ID: ",records[i]["studID"])
            print("Student Name: ",records[i]["Student Name"])
            print("Student Grade: ",records[i]["Student Grade"])
            print("")

while True: 
    print("[1] Add a Record")
    print("[2] Undo last added Record")
    print("[3] Sort Records")
    print("[4] Search from Records")
    print("[5] Display all Records")
    print("[6] Exit program")
    
    try:
        choice = int(input("What would you like to do?"))

        if choice == 1:

            studID = str(input("Enter Student ID#: "))
            studName = str(input("Enter Student Name: "))
            choice = float(input("Enter Student Grade: "))
            if choice > 100 or choice == 0:
                print("invalid input\n")
            else:
                studGrade = choice
                newRecord = {
                "studID":studID,
                "Student Name":studName,
                "Student Grade":studGrade,
                }

                records.append(newRecord)
                print("Student added successfully!\n")

        elif choice == 2:
            if len(records) != 0:
                records.pop(-1)
                print("Undo last added Record successful!")
            else:
                print("there are no record to undo\n")

        elif choice == 3:
            choice = str(input("Enter(g) for grades & (n) for name: "))

            if choice.lower() == "g":
                selectionSort(records, "Student Grade")
            elif choice.lower() == "n":
                selectionSort(records, "Student Name")
            else:
                print("invalid input.")                       
                        
        elif choice == 4:
            choice = str(input("Enter Student Name/Id: "))
            found = False

            for record in records:
                if choice.lower() == record["Student Name"].lower() or record["studID"].lower():
                    print("Student Found!")
                    print(f"Student ID: {record["studID"]}")
                    print(f"Student Name: {record["Student Name"]}")
                    print(f"Student Grade: {record["Student Grade"]}\n")
                    found = True
            if not found:
                print("No record with this Name/ID found!\n")

        elif choice == 5:
            if len(records) == 0:
                print("there are no Records to show\n")
            else:
                displayRecords(records)

        elif choice == 6:
            print("Exiting program..")
            break
        else:
            print("invalid input\n")
    except ValueError:
        print("invalid input\n")