// 🧩 ABSTRACT-LIKE BASE CLASS (Abstraction)
class Person {
  constructor(name) {
    this.name = name;
  }

  // 🧩 Abstract-like method (must be implemented by subclasses)
  displayRole() {
    throw new Error("displayRole() must be implemented by subclass");
  }
}

// 🔒 Student Class with Encapsulation
class Student extends Person {
  #age; // 🔒 private property (Encapsulation)

  constructor(name, age, course) {
    super(name); // 🧩 Inherited from Person (Abstraction)
    this.#age = age;
    this.course = course;
  }

  // 🔒 Getter and Setter (Encapsulation: controlled access)
  get age() {
    return this.#age;
  }

  set age(value) {
    if (value > 0) {
      this.#age = value;
    } else {
      console.log("❌ Age must be greater than 0");
    }
  }

  displayInfo() {
    console.log(`🎓 Student Name: ${this.name}`);
    console.log(`   Age: ${this.#age}`);
    console.log(`   Course: ${this.course}`);
  }

  // 🧩 Implementation of abstract method (Abstraction)
  displayRole() {
    console.log(`${this.name} is a Student.`);
  }
}

// Teacher Class (inherits abstraction)
class Teacher extends Person {
  constructor(name, subject, yearsOfExperience) {
    super(name); // 🧩 Inherited from Person
    this.subject = subject;
    this.yearsOfExperience = yearsOfExperience;
  }

  introduce() {
    console.log(`👩‍🏫 Hello, I am ${this.name}, I teach ${this.subject}.`);
  }

  // 🧩 Implementation of abstract method (Abstraction)
  displayRole() {
    console.log(`${this.name} is a Teacher.`);
  }
}

// Course Class
class Course {
  constructor(courseName, courseCode, instructor) {
    this.courseName = courseName;
    this.courseCode = courseCode;
    this.instructor = instructor; // Teacher object
  }

  showCourseDetails() {
    console.log(`📘 Course: ${this.courseName}`);
    console.log(`   Code: ${this.courseCode}`);
    console.log(`   Instructor: ${this.instructor.name}`);
  }
}

// Department Class
class Department {
  constructor(departmentName, head) {
    this.departmentName = departmentName;
    this.head = head; // Teacher object
    this.courses = [];
  }

  addCourse(course) {
    this.courses.push(course);
    console.log(`✅ Added course "${course.courseName}" to ${this.departmentName} Department.`);
  }

  showDepartmentDetails() {
    console.log(`\n🏫 Department: ${this.departmentName}`);
    console.log(`Head: ${this.head.name}`);
    console.log(`Courses Offered:`);
    this.courses.forEach((course) => {
      console.log(` - ${course.courseName} (${course.courseCode})`);
    });
  }
}

// 🔁 Polymorphism Function
function showPersonRole(person) {
  // 🔁 Works differently depending on object type (Student or Teacher)
  person.displayRole();
}

// =============================
// Final Integration
// =============================

// Create Teacher objects
const teacher1 = new Teacher("Mr. Cruz", "Mathematics", 8);
const teacher2 = new Teacher("Ms. Santos", "Computer Science", 5);

// Create Student objects
const student1 = new Student("Alice", 20, "BSCS");
const student2 = new Student("Mark", 19, "BSIT");
const student3 = new Student("Jenny", 21, "BSCS");

// Create Course objects
const course1 = new Course("Programming 1", "CS101", teacher2);
const course2 = new Course("Calculus", "MATH101", teacher1);

// Create Department object
const department1 = new Department("Computer Studies", teacher2);
department1.addCourse(course1);
department1.addCourse(course2);

// Show Department Details
department1.showDepartmentDetails();

// Show Teacher Introductions
console.log("\n👩‍🏫 TEACHERS:");
teacher1.introduce();
teacher2.introduce();

// Show Students
console.log("\n🎓 STUDENTS:");
student1.displayInfo();
student2.displayInfo();
student3.displayInfo();

// 🔁 Demonstrating Polymorphism
console.log("\n🧠 ROLES (Polymorphism):");
showPersonRole(student1); // same function, different behavior
showPersonRole(teacher2);

// 🔒 Encapsulation check
console.log("\n🔒 ENCAPSULATION TEST:");
student1.age = -2; // invalid
student1.age = 22; // valid
console.log(`${student1.name}'s updated age: ${student1.age}`);

console.log("\n✅ All data displayed successfully!");
