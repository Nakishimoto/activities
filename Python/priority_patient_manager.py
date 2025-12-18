records = []

def displayRecords(records, index = 0):
    if len(records) == 0:
        print("there are no Records to display\n")
        return
    
    if index == len(records):
        print("================[ ]================\n")
        return

    if index == 0:
        print(f"[Patients Queue][Total Patients: {len(records)}]\n")

    record = records[index]

    print(f"Patient #{index + 1}")
    print(f"Patient Name: {record['Patient Name']}")
    print(f"Status: {record['status']}")

    if record["urgency"] == "1":
        print("Urgency: Low\n")
    elif record["urgency"] == "2":
        print("Urgency: High\n")
    else:
        print("Urgency: Severe\n")

    displayRecords(records, index + 1)


def validator(name):
    for c in name.lower():
        if not (('a' <= c <= 'z') or c == ' '):
            return False
    return True

def selectionSort(records, key_name):
    n = len(records)
    print("========[Selection Sorted Queue]========\n")
    for i in range(n):
        max_index = i
        for j in range(i + 1, n):
            if records[j][key_name].lower() > records[max_index][key_name].lower():
                max_index = j
        records[i], records[max_index] = records[max_index], records[i]

    if key_name == "Patient Name":
        for i in range(len(records) -1, -1, -1):
            print(f"Patient Name: ",records[i]["Patient Name"])
            if records[i]["urgency"] == "1":
                print("Urgency: Low\n")
            elif records[i]["urgency"] == "2":
                print("Urgency: High\n")
            else:
                print("Urgency: Severe\n")
        print("==============[ ]=============\n")
    else:
        for record in records:
            print(f"Patient Name: ",record["Patient Name"])
            if record["urgency"] == "1":
                print("Urgency: Low\n")
            elif record["urgency"] == "2":
                print("Urgency: High\n")
            else:
                print("Urgency: Severe\n")
        print("==============[ ]=============\n")

def bubbleSort(records, key_name):
    n = len(records)
    print("========[Bubble Sorted Queue]========\n")

    for i in range(n):
        for j in range(0, n - i - 1):
            if records[j][key_name] > records[j + 1][key_name]:
                records[j], records[j + 1] = records[j + 1], records[j]

    for record in records:
        print(f"Patient Name: {record['Patient Name']}")
        if record["urgency"] == "1":
            print("Urgency: Low\n")
        elif record["urgency"] == "2":
            print("Urgency: High\n")
        else:
            print("Urgency: Severe\n")

    print("==============[ ]=============\n")

while True: 
    print("=======[Main Menu]========")  
    print("[1] Add a Patient to Queue")
    print("[2] Undo last added Patient")
    print("[3] Sort Patients")
    print("[4] Search a Patient")
    print("[5] Display all Patient")
    print("[6] Mark Patient as Treated")
    print("[7] Exit program")
    print("===========[ ]============\n")

    try:
        choice = int(input("What would you like to do: \n➤ "))

        if choice == 1:
            print("\n========[add a Patient to Queue]=======")
            choice = str(input("Enter Patient Name: \n➤ "))
            print("=================[ ]===================\n")

            if choice.strip() == "":
                print("(Name cannot be empty.)\n")

            elif validator(choice) != False:

                match = False
                for i in range(len(records)):
                    if (records[i]["Patient Name"].lower().strip() == choice.lower().strip()):
                        print(f"(a Record with a Name of \"{choice}\" already exists.)\n")
                        match = True

                if not match:
                    name = choice
                    status = "to be Treated"
                    print("[Urgency Lvl]")
                    print("[1] Low ")
                    print("[2] High")
                    print("[3] Severe")

                    while True:
                        try:
                            choice = int(input("enter Urgency lvl: \n➤ "))

                            if choice == 1:
                                urgency = "1"
                                break
                            elif choice == 2:
                                urgency = "2"
                                break
                            elif choice == 3:
                                urgency = "3"
                                break
                            else:
                                print("(invalid input)\n")
                        except ValueError:
                            print("(invalid input.)\n")

                    newRecord = {
                        "Patient Name":name.strip(),
                        "urgency":urgency,
                        "status":status,
                    }

                    records.append(newRecord)
                    print("(Patient added to Queue!)\n")
            else:
                print("(please enter letters only.)\n")

        elif choice == 2:
            print("\n========[Undo last added Patient]========\n")
            try:
                records.pop(-1)
                print("(Undo last added Patient successful!)\n")
                print("========[Undo last added Patient]========\n")

            except IndexError:
                print("(there are no Record to undo.)\n")

        elif choice == 3:
            print("\n========[Sort Records by Name or Urgency]========")
            if len(records) > 1:
                sort = str(input("Choose Sorting Algorithm: (b)ubble / (s)election\n➤ "))
                choice = str(input("Sort by: (n)ame / (u)rgency \n➤ "))
                sortBy = "urgency" if choice.lower().strip() == "u" else "Patient Name"

                if sort.lower().strip() == "b":
                    bubbleSort(records, sortBy)  
                    print("(records sorted using Bubble Sort!)\n")
                elif sort.lower().strip() == "s":
                    selectionSort(records, sortBy)
                    print("(records sorted using Selection Sort!)\n")
                else:
                    print("(invalid input.)\n")
            else:
                print("(there is only one Record or no Records to Sort.)\n")
                print("========[Sort Records by Name or Urgency]========\n")
                        
        elif choice == 4:
            print("======[Searching a Patient from Records]======\n")
            try:
                choice = input("Enter Patient Name: \n➤ ")
                found = False

                if choice.strip() == "":
                    print("(Name cannot be empty.)")

                elif validator(choice) != False:
                    for data in records:
                        if choice.lower().strip() == data["Patient Name"].lower().strip():
                            print("(Patient Found!)\n")
                            found = True
                            print(f"Patient Name: {data["Patient Name"]}")
                            print(f"Status: {data["status"]}")
                            if data["urgency"] == "1":
                                print("Urgency: Low\n")
                            elif data["urgency"] == "2":
                                print("Urgency: High\n")
                            else:
                                print("Urgency: Severe\n")
                            print("======[Searching a Patient from Records]======\n")                
                    if not found:
                        print("(Patient not Found!)\n")
                        print("======[Searching a Patient from Records]======\n")
                else:
                    print("(please enter letters only.)\n")
            except (IndexError, ValueError):
                print("(invalid input.)\n")

        elif choice == 5:
            print("\n=======[Display all Records]=======")
            displayRecords(records)

        elif choice == 6:
            print("\n=======[mark Patient as Treated]========")
            if len(records) == 0:
                print("(records is empty.)\n")
            else:
                m = 1
                for record in records:
                    print(f"Patient #{m}")
                    print(f"Patient Name: {record['Patient Name']}")
                    print(f"Status({record['status']})\n")
                    print()
                    m += 1

                choice = int(input("Which Patient# would you like to mark as treated: \n➤ "))
                print("===============[  ]=====================\n")
                try: 
                    if choice <= 0  or choice > len(records):
                        print("(invalid input.)\n")
                    else:    
                        records[choice - 1]['status'] = "Treated"
                        print(f"({records[choice - 1]['Patient Name']} is now marked as Treated!)\n")

                except (IndexError, ValueError):
                    print("(invalid input.)\n")


        elif choice == 7:
            print("Exiting program..")
            break

        else:
            print("(invalid input.)\n")

    except ValueError:
        print("(invalid input.)\n")