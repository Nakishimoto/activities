class Person {
    constructor(name) {
        this.name = name;
    }

    getRole() {
        console.log("use the subclass.")
    }
 }

 class Student extends Person {
    #age;
    constructor(name,age,course) {
        super(name)
        this.course = course; 
    }

    setAge(newValue) {
        if(newValue <= 0) {
            console.log(`${newValue} is an invalid age.`)
        } else {
            this.#age = newValue;   
        }
    }

    getAge() {
        return this.#age;
    }

    getRole() {
        console.log(`${this.name} is a Student.`)
    }
 }

class Costumer extends Person {
    constructor(name,subject) {
        super(name)
        this.subject = subject;
    }

    getRole() {
        console.log(`${this.name} is a Costumer.`)
    }
}

class Item {
    constructor(itemName, itemPrice) {
        this.itemName = itemName;
        this.itemPrice = itemPrice;
    }
}

class Cart {
    constructor(orderNum, costumer) {
        this.orderNum = orderNum;
        this.costumer = costumer;
        this.items = []
    }

    addItem(item) {
        this.items.push(item)
    }

    showDetails() {
        console.log(`Order num: ${this.orderNum}`)
        console.log(`Costumer: ${this.costumer}`)
        console.log("items in Cart: ")
        for(let i = 0; i < this.items.length; i++) {
            console.log(`${this.items[0].itemName} $${this.items[0].itemPrice}`)
        }
    }
}

Costumer1 = new Costumer("Xiron Tarala", "Programming1")
student1 = new Student("Xiron Tarala", 21, "BSIT")
const item = new Item("Laptop", 1000)
const department1 = new Cart("BSIT","Mr. Tarala")
department1.addItem(item)
department1.showDetails()

