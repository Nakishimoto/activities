const { setUncaughtExceptionCaptureCallback } = require("process");
const readline = require("readline");

class Person {
    constructor(name) { this.name = name; }
    displayRole() { throw new Error("displayRole() must be implemented by subclass"); }
}

class Customer extends Person {
    access = "none";
    constructor(name) { super(name); }
    displayRole() { console.log(`I am ${this.name} and I'm a Customer.`); }
}

class Staff extends Person {
    access = "none";
    constructor(name) { super(name); }
    displayRole() { console.log(`I am ${this.name} and I'm a Staff.`); }
}

class Manager extends Person {
    access = "full";
    constructor(name) { super(name); }
    displayRole() { console.log(`I am ${this.name} and I'm a Manager.`); }
}

class Room {
    #price;
    constructor(roomCode, capacity, price, status = "available") {
        this.roomCode = roomCode;
        this.capacity = capacity;
        this.#price = price;
        this.status = status;
    }
    getPrice() { 
        return this.#price; 
    }

    setPrice(person, price) {
        if(person.access === "full") { this.#price = price; console.log(`Room ${this.roomCode} price updated.`); }
        else console.log("You don't have permission to do that.");
    }
    showRoomDetails() {
        console.log(`Room Code: ${this.roomCode}`)
        console.log(`Capacity: ${this.capacity}`)
        console.log(`Price: $${this.getPrice()}`)
        console.log(`Status: ${this.status}\n`)
    }
}

class RoomType {
    constructor(typeName, staff) {
        this.typeName = typeName;
        this.staff = staff;
        this.rooms = [];
    }
    addRoom(room) {
        if(room.getPrice() <= 0) console.log("Price must be greater than 0.");
        else { this.rooms.push(room); console.log(`Added room ${room.roomCode} to ${this.typeName}.`); }
    }
    showRoomTypeDetails() {
        console.log(`\nRoom Type: ${this.typeName}, Staff: ${this.staff.name}`);
        this.rooms.forEach(r => r.showRoomDetails());
    }
}

const customers = [];
const staffMembers = [];
const managers = [];
const roomTypes = [];
const bookings = []; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMainMenu() {
    console.log("\n=== MAIN MENU ===");
    console.log("[1] Continue as Customer");
    console.log("[2] Continue as Manager");
    console.log("[3] Add a Customer");
    console.log("[4] Add a Staff");
    console.log("[5] Add a Manager");
    console.log("[6] Show all Customers");
    console.log("[7] Show all Staff");
    console.log("[8] Show all Managers");
    console.log("[9] Exit");
}

function showCustomerMenu() {
    console.log("\n=== CUSTOMER MENU ===");
    console.log("[1] Check available Rooms");
    console.log("[2] Book a Room");
    console.log("[3] Pre-Book a Room")
    console.log("[4] Back to Main Menu");
}

function showManagerMenu() {
    console.log("\n=== MANAGER MENU ===");
    console.log("[1] Create Room Type");
    console.log("[2] Add Room to Room Type");
    console.log("[3] Display Bookings");
    console.log("[4] Remove a costumer");
    console.log("[5] Remove a staff");
    console.log("[6] Change Room price");
    console.log("[7] Back to Main Menu");
}

function mainMenu() {
    showMainMenu();
    rl.question("Enter choice: ", answer => {
        switch(answer.trim()) {
            case "1":
                if(customers.length === 0) {
                    console.log("No customers exist. Add one first.");
                    mainMenu();
                } else {
                    chooseCustomer();
                }
                break;

            case "2":
                if(managers.length === 0) {
                    console.log("No managers exist. Add one first.");
                    mainMenu();
                } else {
                    chooseManager();
                }
                break;

            case "3":
                addCustomer();
                break;

            case "4":
                addStaff();
                break;

            case "5":
                addManager();
                break;

            case "6":
                if(customers.length === 0) {
                    console.log("Add a Customer first.")
                    mainMenu();
                    return;
                } else {
                    console.log("Customers:", customers.map(c => c.name));
                    mainMenu();
                }
                break;

            case "7":
                if(staffMembers.length === 0) {
                    console.log("Add a Staff first.")
                    mainMenu();
                    return;
                } else {
                    console.log("Staffs:", staffMembers.map(c => c.name));
                    mainMenu();
                }
                break;

            case "8":
                if(managers.length === 0) {
                    console.log("Add a Manager first.")
                    mainMenu();
                    return;
                } else {
                    console.log("Managers:", managers.map(c => c.name));
                    mainMenu();
                }
                break;
            case "9":
                console.log("Exiting...");
                rl.close();
                break;

            default:
                console.log("Invalid choice.");
                mainMenu();
        }
    });
}

function chooseCustomer() {
    console.log("Select Customer:");
    customers.forEach((c, i) => console.log(`[${i+1}] ${c.name}`));
    rl.question("Enter number: ", num => {
        const index = parseInt(num.trim()) - 1;
        if(customers[index]) customerMenuInterface(customers[index]);
        else { console.log("Invalid customer."); mainMenu(); }
    });
}

function customerMenuInterface(customer) {
    showCustomerMenu();
    rl.question("Enter choice: ", answer => {
        switch(answer.trim()) {
            case "1": 
                if(roomTypes.length === 0) console.log("No room types exist.");
                else roomTypes.forEach(rt => rt.showRoomTypeDetails());
                customerMenuInterface(customer);
                break;

            case "2": 
                bookRoom(customer);
                break;

            case "3": 
                mainMenu();
                break;
            
            case "4": 
                mainMenu();
                break;

            default:
                console.log("Invalid choice.");
                customerMenuInterface(customer);
        }
    });
}

function bookRoom(customer) {
    if(roomTypes.length === 0) {
        console.log("No room types available.");
        customerMenuInterface(customer);
        return;
    }

    console.log("\nSelect a Room Type:");
    roomTypes.forEach((rt, i) => console.log(`[${i+1}] ${rt.typeName}`));
    rl.question("Enter number: ", rtNum => {
        const rtIndex = parseInt(rtNum.trim()) - 1;
        const selectedRT = roomTypes[rtIndex];

        if(!selectedRT || selectedRT.rooms.length === 0) {
            console.log("Invalid choice or no rooms available in this type.");
            customerMenuInterface(customer);
            return;
        }

        console.log("\nSelect a Room:");
        selectedRT.rooms.forEach((room, i) => {
            console.log(`[${i+1}] ${room.roomCode} - Capacity: ${room.capacity}, Price: $${room.getPrice()}`);
        });

        rl.question("Enter number: ", roomNum => {
            const roomIndex = parseInt(roomNum.trim()) - 1;
            const selectedRoom = selectedRT.rooms[roomIndex];

            if(!selectedRoom || selectedRoom.status !== "available") {
                console.log("Invalid Room choice or Room is already booked.");
                customerMenuInterface(customer);
                return;
            }

            rl.question("Enter number of days to book: ", daysInput => {
                const days = parseInt(daysInput.trim());

                if(isNaN(days) || days <= 0) {
                    console.log("Invalid number of days.");
                    customerMenuInterface(customer);
                    return;
                }

                const total = selectedRoom.getPrice() * days;
                bookings.push({ customer: customer.name, 
                                roomType: selectedRT.typeName, 
                                roomCode: selectedRoom.roomCode, 
                                days, total });
        
                selectedRoom.status = "booked";
                console.log(`\nBooking Summary:`);
                console.log(`Customer: ${customer.name}`);
                console.log(`Room Type: ${selectedRT.typeName}`);
                console.log(`Room Code: ${selectedRoom.roomCode}`);
                console.log(`Price per night: $${selectedRoom.getPrice()}`);
                console.log(`Number of days: ${days}`);
                console.log(`Total Price: $${total}\n`);
                console.log("Booking successful!");

                customerMenuInterface(customer);
            });
        });
    });
}

function chooseManager() {
    console.log("Select Manager:");
    managers.forEach((m,i) => console.log(`[${i+1}] ${m.name}`));
    rl.question("Enter number: ", num => {
        const index = parseInt(num.trim()) - 1;
        if(managers[index]) managerMenuInterface(managers[index]);
        else { console.log("Invalid manager."); mainMenu(); }
    });
}

function managerMenuInterface(manager) {
    showManagerMenu();
    rl.question("Enter choice: ", answer => {
        switch(answer.trim()) {
            case "1": 
                if (staffMembers.length === 0) { 
                    console.log("Add a staff first."); 
                    managerMenuInterface(manager); 
                    return;
                }
                staffMembers.forEach((staff, i) => console.log(`[${i+1}] ${staff.name}`));
                rl.question("Enter Staff for this Room Type: ", num => {
                    const index = parseInt(num.trim()) - 1;
                    if (!staffMembers[index]) {
                        console.log("Invalid staff.");
                        managerMenuInterface(manager);
                        return;
                    }
                    console.log(`You have chosen ${staffMembers[index].name} for this Room Type.`);
                    rl.question("Enter Room Type name: ", name => {
                        const rtName = name.trim();
                        const exists = roomTypes.some(rt => 
                            rt.typeName.toLowerCase() === rtName.toLowerCase()
                        );
                        if (exists) {
                            console.log(`Room Type "${rtName}" already exists.\n`);
                            managerMenuInterface(manager);
                            return;
                        }
                        const newRT = new RoomType(rtName, staffMembers[index]);
                        roomTypes.push(newRT);
                        console.log(`Room Type "${rtName}" created successfully!`);
                        managerMenuInterface(manager);
                    });
                });
                break;

            case "2": 
                if(roomTypes.length === 0) { console.log("No Room Types exist."); managerMenuInterface(manager); }
                else {
                    roomTypes.forEach((rt,i)=>console.log(`[${i+1}] ${rt.typeName}`));
                    rl.question("Select Room Type number: ", num => {
                        const rtIndex = parseInt(num.trim()) - 1;
                        const selectedRT = roomTypes[rtIndex];
                        if(!selectedRT) { console.log("Invalid."); managerMenuInterface(manager); return; }

                        rl.question("Enter Room Code: ", code => {
                            rl.question("Enter Capacity: ", cap => {
                                rl.question("Enter Price: ", price => {
                                    const room = new Room(code.trim(), parseInt(cap), parseFloat(price));
                                    selectedRT.addRoom(room);
                                    managerMenuInterface(manager);
                                });
                            });
                        });
                    });
                }
                break;

            case "3":
                if(bookings.length > 0) {
                    bookings.forEach((b, i) => {
                    console.log(`\nBooking #${i+1}`);
                    console.log(`Customer: ${b.customer}`);
                    console.log(`Room Type: ${b.roomType}`);
                    console.log(`Room Code: ${b.roomCode}`);
                    console.log(`Number of days: ${b.days}`);
                    console.log(`Total Price: $${b.total}\n`);})
                    managerMenuInterface(manager);
                    return;
                    } else {
                    console.log("There are no Booking to display.")
                    managerMenuInterface(manager);
                }
                break;

            case "4":
                if(customers.length > 0) {
                    customers.forEach((c,i) => console.log(`[${i+1}] ${c.name}`))
                    rl.question("Enter Customer to remove: ", num => {
                        const index = parseInt(num.trim() - 1);
                        console.log(`${customers[index]} has been removed.`)
                        customers.pop(index) });
                        managerMenuInterface(manager);
                        return;
                } else {
                    console.log("There are no customer to remove.")
                    managerMenuInterface(manager);
                }
                break;

            case "5":
                if(customers.length > 0) {
                    staffMembers.forEach((c,i) => console.log(`[${i+1}] ${c.name}`))
                    rl.question("Enter Customer to remove: ", num => {
                        const index = parseInt(num.trim() - 1);
                        console.log(`${staffMembers[index]} has been removed.`)
                        staffMembers.pop(index) });
                        managerMenuInterface(manager);
                        return;
                } else {
                    console.log("There are no staff to remove.")
                    managerMenuInterface(manager);
                }
                break;

            case "6":
                if(roomTypes.lenght === 0) {
                    console.log("Add a Room Type first.\n")
                    managerMenuInterface(manager);
                    return;
                } else {
                    roomTypes.forEach((rt, i) => console.log(`\n[${i+1}] ${rt.typeName}`))
                    rl.question("Select a Room Type: ", num => {
                        const rtIndex = parseInt(num.trim()) - 1;
                        const rtChoice = roomTypes[rtIndex]
                        if (!rtChoice) {
                            console.log("Invalid Room Type selection.");
                            managerMenuInterface(manager);
                            return;
                        }
                        rtChoice.rooms.forEach((room, i) => {console.log(`\nRoom#${i+1}`); room.showRoomDetails()});
                        rl.question("Change the price for which room: ", crp => {
                            const roomIndex = parseInt(crp.trim()) - 1;
                            const crpChoice = rtChoice.rooms[roomIndex]
                            if (!crpChoice) {
                                console.log("Invalid Room selection.");
                                managerMenuInterface(manager);
                                return;
                            }
                            const oldPrice = crpChoice.getPrice();
                            rl.question("Change price to: ", changePrice => {
                                const newPrice = parseInt(changePrice.trim());
                                if (isNaN(newPrice) || newPrice <= 0) {
                                    console.log("Invalid price.");
                                    managerMenuInterface(manager);
                                    return;
                                }
                                crpChoice.setPrice(manager, newPrice);
                                console.log(`The price for Room: ${crpChoice.roomCode} has been updated from $${oldPrice} to $${newPrice}`);
                                managerMenuInterface(manager);
                            });
                        });
                    });
                }
                break;
            
            case "7":
                mainMenu();
                break;

            default:
                console.log("Invalid choice.");
                managerMenuInterface(manager);
        }
    });
}

function addCustomer() {
    rl.question("Enter Customer name: ", name => {
        const c = new Customer(name.trim());
        customers.push(c);
        console.log("Customer added!");
        mainMenu();
    });
}

function addStaff() {
    rl.question("Enter Staff name: ", name => {
        const s = new Staff(name.trim());
        staffMembers.push(s);
        console.log("Staff added!");
        mainMenu();
    });
}

function addManager() {
    rl.question("Enter Manager name: ", name => {
        const m = new Manager(name.trim());
        managers.push(m);
        console.log("Manager added!");
        mainMenu();
    });
}

mainMenu();