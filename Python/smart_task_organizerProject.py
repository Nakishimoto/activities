tasks = []

def displayTasks(task):
    m = 1
    for task in tasks:
        print(f"Task #{m}: ",task)
        m += 1

while True: 
    print("[1] Add a Task")
    print("[2] Undo last Task entry")
    print("[3] Sort Tasks")
    print("[4] Search Tasks")
    print("[5] Display Tasks")
    print("[6] Exit program")

    choice = int(input("What would you like to do?"))

    if choice == 1:

        newTask = input("Enter Task: ")

        tasks.append(newTask)
        print("Task added successfully!")

    if choice == 2:
        tasks.pop(-1)
        print("Undo last Task entry successful!")

    if choice == 3:
        m = 1
        n = len(tasks)
        print("[Sorted Tasks]")
        for i in range(len(tasks)):
            min_index = i
            for j in range(i + 1, n):
                if tasks[j].lower() < tasks[min_index].lower():
                    min_index = j
            tasks[i], tasks[min_index] = tasks[min_index], tasks[i]

        for task in tasks:
            print(f"Task #{m}: ",task)
            m += 1

    if choice == 4:
        choice = input("Enter Task to Search: ")
        
        if choice in tasks:
            print("Task Found!")
        else:
            print("Task not Found!")

    if choice == 5:
        displayTasks(tasks)

    if choice == 6:
        print("Exiting program..")
        break

