data = []
def createInfo():
    id = input("Enter your ID: ")
    name = input("Enter your name: ")
    age = input("Enter your age: ")
    gender = input("Enter your gender: ")
    course = input("Enter your course: ")

    student = {
        "id": id,
        "Name": name,
        "age": age,
        "gender": gender,
        "course": course
    }

    data.append(student)

def displayInfo():
    for student in data:
        print("Name:", student["Name"])
        print("Age:", student["age"])
        print("Gender:", student["gender"])
        print("Course:", student["course"]) 

def deleteInfo():
    
