class Person {
    constructor(name) {
        this.name = name;
    }

    displayRole() {
    throw new Error("displayRole() must be implemented by subclass");
  }

    bookRoom(costumer,roomType, room, days) {
        this.costumer = costumer;
        this.roomType = roomType;
        this.room = room;
        this.days = days;

        this.total = this.room.getPrice() * this.days;
        
        if(this.room.getPrice() <= 0) {
            console.log("This room is not available for booking.")
        }   else {
            console.log(`Booking for: ${costumer.name}`)
            console.log(`You have successfully booked a ${this.roomType.typeName} room!\n`)
            console.log(`Your Room Code is ${room.roomCode}. Priced at ${room.getPrice()} per night with a capacity for ${room.capacity} people.`)
            console.log(`You have booked ${room.roomCode} for ${this.days} days.`)
            console.log(`Total: $${this.total}\n`)
        }
    }
}

class Costumer extends Person {
    access = "none"
    constructor(name) {
        super(name)
    }

    displayRole() {
    console.log(`I am ${this.name} and im a Costumer.`)
  }
}

class Staff extends Person{
    access = "none"
    constructor(name) {
        super(name)
    }

    displayRole() {
    console.log(`I am ${this.name} and im a Staff.`)
  }
}

class Manager extends Person{
    access = "full"
    constructor(name) {
        super(name)
    }

    displayRole() {
    console.log(`I am ${this.name} and im a Manager.`)
  }
}

class Room {
    #price;
    constructor(roomCode, capacity, price) {
    this.roomCode = roomCode;
    this.capacity = capacity;
    this.#price = price;
  }

  setPrice(person, price) {
    if(person.access == "full") {
        console.log(`The price of ${this.roomCode} has been updated to ${price} per night!\n`)
        this.#price = price;
    } else {
        console.log("You don't have a permission to do that.\n")
    }
  }

  getPrice() {
    return this.#price;
  }

  showRoomDetails() {
    console.log(`Room Code: ${this.roomCode}`);
    console.log(`Room Capacity: ${this.capacity}`);
    console.log(`Price: ${this.getPrice()} per night.`);

  }
}

class roomType {
  constructor(typeName, staff) {
    this.typeName = typeName;
    this.staff = staff; 
    this.rooms = [];
  }

  addRoom(room) {
    if(room.getPrice() <= 0) {
        console.log("The room price cannot be less than or equal to 0.\n")
    }   else {
        this.rooms.push(room);
        console.log(`Added "${room.roomCode}" to ${this.typeName} rooms.`);
    }
    
  }

  showRoomTypeDetails() {
    console.log(`\nRoom Type: ${this.typeName}`);
    console.log(`Staff: ${this.staff.name}`);
    console.log(`Available Rooms:\n`);
    this.rooms.forEach((room) => (
      console.log(`Room Code: ${room.roomCode} \nRoom Capacity: ${room.capacity} \nRoom Price: $${room.getPrice()} per night\n`)
    ));
  }
}

function showPersonRole(person) {
  person.displayRole();
}

//Create costumer, staff, manager
const costumer1 = new Costumer("myCostumer");
const staff1 = new Staff("myStaff")
const manager1 = new Manager("Xiron Arl")

//Create a room type
const standard = new roomType("Standard",staff1) 

//Create rooms
const room1 = new Room("Room 1A", 2, 1000)
const room2 = new Room("Room 1B", 5, 3000)

//Add rooms to room type
standard.addRoom(room1);
standard.addRoom(room2);

//Show available rooms for room type
standard.showRoomTypeDetails();

//Change a room's price(can only be used by manager)
room1.setPrice(manager1,500)

//Book a room
costumer1.bookRoom(costumer1, standard, room1, 7);

//Show role using showPersonRole() function
showPersonRole(manager1)