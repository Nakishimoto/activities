class Person {
    constructor(name,email) {
        this.name = name;
        this.email = email;
    }

    getRole(){

    }   

    accessLevel() {

    }
}

class Costumer extends Person {
    constructor(name, email, accessLevel) {
        super(name,email)
        this.accessLevel = "Costumer"
    }
}

class Cart {
    constructor(items) {
        items = []
    }
}

class Order {
    constructor(id, items = []) {
        this.id = id;
        this.items = items;
    }
}