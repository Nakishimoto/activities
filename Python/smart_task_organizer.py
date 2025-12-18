tasks = []

def displayTasks(task):
    if len(task) == 0:
        print("there are no Tasks to show")
        print("")
    else:
        print("[To Do:]")
        m = 1
        for task in tasks:
            print(f"Task #{m}")
            print(f"Task Name: {task['Task Name']}")
            print(f"Status({task['Task Status']})")
            print()
            m += 1

while True: 
    print("[1] Add a Task")
    print("[2] Undo last added Task")
    print("[3] Sort Tasks")
    print("[4] Search for a Task")
    print("[5] Show Tasks")
    print("[6] Mark a Task as completed")
    print("[7] Exit program")

    try:
        choice = int(input("\nWhat would you like to do: "))

        if choice == 1:

            taskName = input("Enter Task Name: ")
            taskStat = "to be done"

            newTask = {
            'Task Name':taskName,
            'Task Status':taskStat,
            }

            tasks.append(newTask)
            print("Task added successfully!\n")


        elif choice == 2:
            try:
                tasks.pop(-1)
                print("Undo last added Task successful!")

            except IndexError:
                print("there are no record to undo\n")

        elif choice == 3:
            if len(tasks) > 1:
                m = 1
                n = len(tasks)
                print("[Sorted Tasks]")
                for i in range(n):
                    max_index = i
                    for j in range(i + 1, n):
                        if tasks[j]['Task Name'].lower() < tasks[max_index]['Task Name'].lower():
                            max_index = j
                    tasks[i], tasks[max_index] = tasks[max_index], tasks[i]

                for task in tasks:
                    print(f"Task #{m}")
                    print(f"Task Name: {task['Task Name']}")
                    print(f"Status({task['Task Status']})")
                    print()
                    m += 1
            else:
                print("there is only one Task or no Tasks to Sort.\n")

        elif choice == 4:
            choice = input("Enter Task to Search: ")
            
            found = False

            for task in tasks:
                if choice.lower() == task['Task Name'].lower():
                    print("Task Found!\n")
                    print(f"Task Name: {task['Task Name']}")
                    print(f"Status({task['Task Status']})\n")
                    found = True
  
            if not found:
                print("Task not Found!\n")

        elif choice == 5:
            displayTasks(tasks)

        elif choice == 6:
            if len(tasks) == 0:
                print("tasks is empty")    
            else:   
                m = 1
                for task in tasks:
                    print(f"Task #{m}")
                    print(f"Task Name: {task['Task Name']}")
                    print(f"Status({task['Task Status']})")
                    print()
                    m += 1

                choice = int(input("Which Task# would you like to mark as finished: "))
                try: 
                    if choice <= 0  or choice > len(tasks):
                        print("invalid input")
                    else:    
                        tasks[choice - 1]['Task Status'] = "done"
                        print("task marked as done!")

                except (IndexError, ValueError):
                    print("invalid input")

        elif choice == 7:
            print("Exiting program..")
            break

        else:
            print("invalid input\n")

    except ValueError:
        print("invalid input\n")

