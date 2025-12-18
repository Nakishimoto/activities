// ----------------------
// IMPORTS & SETUP
// ----------------------

// Load Node.js built-in "readline" module
// This module provides a way to read input from the terminal and write output
const readline = require("readline");

// Create a readline interface object
// This object allows us to prompt the user and get input from stdin
const rl = readline.createInterface({
    input: process.stdin,  // The source of input is the keyboard (stdin)
    output: process.stdout // The output will appear in the terminal (stdout)
});


// ----------------------
// CLASSES
// ----------------------

// Base class for all people (Customer, Staff, Manager)
class Person {
    constructor(name) { 
        // Save the person's name to the object
        this.name = name; 
    }

    // Method that should be overridden by subclasses
    // If a subclass does not provide its own implementation, it throws an error
    displayRole() { 
        throw new Error("displayRole() must be implemented by subclass"); 
    }
}

// Customer class inherits from Person
class Customer extends Person {
    access = "none"; // Customers have no special permissions

    constructor(name) { 
        super(name); // Call parent constructor to store name
    }

    // Override displayRole to print role info
    displayRole() { 
        console.log(`I am ${this.name} and I'm a Customer.`); 
    }
}

// Staff class inherits from Person
class Staff extends Person {
    access = "none"; // Staff default permissions

    constructor(name) { 
        super(name); 
    }

    displayRole() { 
        console.log(`I am ${this.name} and I'm a Staff.`); 
    }
}

// Manager class inherits from Person
class Manager extends Person {
    access = "full"; // Managers have full access

    constructor(name) { 
        super(name); 
    }

    displayRole() { 
        console.log(`I am ${this.name} and I'm a Manager.`); 
    }
}

// Room class represents a single room
class Room {
    #price; // private property: price cannot be accessed outside

    constructor(roomCode, capacity, price) {
        this.roomCode = roomCode; // Store unique room code
        this.capacity = capacity; // Store room capacity
        this.#price = price;       // Store price privately
    }

    // Getter method for price
    getPrice() { 
        return this.#price; // Returns the private #price
    }

    // Setter method for price with access control
    setPrice(person, price) {
        if(person.access === "full") { // Only manager can change price
            this.#price = price;       // Update price
            console.log(`Room ${this.roomCode} price updated.`); // Feedback
        } else {
            console.log("You don't have permission to do that."); // Deny
        }
    }

    // Display room details
    showRoomDetails() {
        console.log(`Room Code: ${this.roomCode}`);
        console.log(`Capacity: ${this.capacity}`);
        console.log(`Price: $${this.getPrice()}`); // Access private price via getter
    }
}

// RoomType class represents a group of rooms under the same type
class RoomType {
    constructor(typeName, staff) {
        this.typeName = typeName; // Name of room type (e.g., Deluxe)
        this.staff = staff;       // Staff responsible for this type
        this.rooms = [];          // Array to store Room objects
    }

    // Add room to this type
    addRoom(room) {
        if(room.getPrice() <= 0) console.log("Price must be greater than 0."); // Validate
        else { 
            this.rooms.push(room); // Add to rooms array
            console.log(`Added room ${room.roomCode} to ${this.typeName}.`);
        }
    }

    // Show details of this room type and all its rooms
    showRoomTypeDetails() {
        console.log(`\nRoom Type: ${this.typeName}, Staff: ${this.staff.name}`);
        this.rooms.forEach(r => r.showRoomDetails()); // Loop through rooms and show details
    }
}


// ----------------------
// STORAGE ARRAYS
// ----------------------

// Arrays to store objects of each type
const customers = [];      // Stores Customer objects
const staffMembers = [];   // Stores Staff objects
const managers = [];       // Stores Manager objects
const roomTypes = [];      // Stores RoomType objects
const bookings = [];       // Stores booking records


// ----------------------
// MENU FUNCTIONS
// ----------------------

// Print main menu
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

// Print customer menu
function showCustomerMenu() {
    console.log("\n=== CUSTOMER MENU ==="); 
    console.log("[1] Check available rooms"); 
    console.log("[2] Book a room"); 
    console.log("[3] Back to Main Menu"); 
}

// Print manager menu
function showManagerMenu() {
    console.log("\n=== MANAGER MENU ==="); 
    console.log("[1] Create Room Type"); 
    console.log("[2] Add Room to Room Type"); 
    console.log("[3] Remove a costumer"); 
    console.log("[4] Remove a staff"); 
    console.log("[5] Back to Main Menu"); 
}


// ----------------------
// MAIN MENU LOGIC
// ----------------------

function mainMenu() {
    showMainMenu(); // Print menu

    // Ask for user input and pass to callback function
    rl.question("Enter choice: ", answer => {
        switch(answer.trim()) { // Remove spaces/newlines before comparison

            case "1": // Continue as Customer
                if(customers.length === 0) { // Check if there are customers
                    console.log("No customers exist. Add one first."); 
                    mainMenu(); // Re-show menu
                } else {
                    chooseCustomer(); // Show customer selection
                }
                break;

            case "2": // Continue as Manager
                if(managers.length === 0) {
                    console.log("No managers exist. Add one first.");
                    mainMenu();
                } else {
                    chooseManager();
                }
                break;

            case "3": // Add Customer
                addCustomer();
                break;

            case "4": // Add Staff
                addStaff();
                break;

            case "5": // Add Manager
                addManager();
                break;

            case "6": // Show all customers
                console.log("Customers:", customers.map(c => c.name)); // Map objects to names
                mainMenu();
                break;

            case "7": // Show all staff
                console.log("Staff Members:", staffMembers.map(s => s.name));
                mainMenu();
                break;

            case "8": // Show all managers
                console.log("Managers:", managers.map(m => m.name));
                mainMenu();
                break;

            case "9": // Exit program
                console.log("Exiting...");
                rl.close(); // Close interface, stop reading input
                process.exit()
                break;

            default: // Invalid input
                console.log("Invalid choice.");
                mainMenu();
        }
    });
}


// ----------------------
// CUSTOMER LOGIC
// ----------------------

// Choose a customer from the list
function chooseCustomer() {
    console.log("Select Customer:"); 

    // List all customers with numbering
    customers.forEach((c, i) => console.log(`[${i+1}] ${c.name}`));

    // Ask which customer to select
    rl.question("Enter number: ", num => {
        const index = parseInt(num.trim()) - 1; // Convert input to array index

        if(customers[index]) 
            customerMenuInterface(customers[index]); // Pass selected customer object
        else { 
            console.log("Invalid customer."); 
            mainMenu(); 
        }
    });
}

// Show menu specific to selected customer
function customerMenuInterface(customer) {
    showCustomerMenu(); // Print menu

    rl.question("Enter choice: ", answer => {
        switch(answer.trim()) {

            case "1": // Show rooms
                if(roomTypes.length === 0) console.log("No room types exist."); 
                else roomTypes.forEach(rt => rt.showRoomTypeDetails()); // Loop and show details
                customerMenuInterface(customer); // Re-show menu
                break;

            case "2": // Book room
                bookRoom(customer); // Pass customer to booking function
                break;

            case "3": // Back to main menu
                mainMenu();
                break;

            default: // Invalid input
                console.log("Invalid choice.");
                customerMenuInterface(customer); // Re-show menu
        }
    });
}


// ----------------------
// BOOKING LOGIC
// ----------------------

function bookRoom(customer) {
    if(roomTypes.length === 0) { // Check if any room types exist
        console.log("No room types available."); 
        customerMenuInterface(customer); 
        return; // Stop function
    }

    console.log("\nSelect a Room Type:");
    roomTypes.forEach((rt, i) => console.log(`[${i+1}] ${rt.typeName}`)); // List room types

    rl.question("Enter number: ", rtNum => {
        const rtIndex = parseInt(rtNum.trim()) - 1; // Convert input to index
        const selectedRT = roomTypes[rtIndex]; // Get chosen room type

        if(!selectedRT || selectedRT.rooms.length === 0) { // Validate
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

            if(!selectedRoom) { 
                console.log("Invalid room choice."); 
                customerMenuInterface(customer); 
                return; 
            }

            rl.question("Enter number of days to book: ", daysInput => {
                const days = parseInt(daysInput.trim()); // Convert to integer

                if(isNaN(days) || days <= 0) { // Validate input
                    console.log("Invalid number of days."); 
                    customerMenuInterface(customer); 
                    return; 
                }

                const total = selectedRoom.getPrice() * days; // Calculate total price
                bookings.push({ 
                    customer: customer.name, 
                    roomType: selectedRT.typeName, 
                    roomCode: selectedRoom.roomCode, 
                    days, 
                    total 
                }); // Store booking

                console.log(`\nBooking Summary:`); 
                console.log(`Customer: ${customer.name}`);
                console.log(`Room Type: ${selectedRT.typeName}`);
                console.log(`Room Code: ${selectedRoom.roomCode}`);
                console.log(`Price per night: $${selectedRoom.getPrice()}`);
                console.log(`Number of days: ${days}`);
                console.log(`Total Price: $${total}\n`);
                console.log("Booking successful!");

                customerMenuInterface(customer); // Return to menu
            });
        });
    });
}


// ----------------------
// MANAGER LOGIC
// ----------------------

function chooseManager() {
    console.log("Select Manager:");
    managers.forEach((m,i) => console.log(`[${i+1}] ${m.name}`)); // List managers
    rl.question("Enter number: ", num => {
        const index = parseInt(num.trim()) - 1; 
        if(managers[index]) 
            managerMenuInterface(managers[index]); 
        else { 
            console.log("Invalid manager."); 
            mainMenu(); 
        }
    });
}

function managerMenuInterface(manager) {
    showManagerMenu(); 

    rl.question("Enter choice: ", answer => {
        switch(answer.trim()) {

            case "1": // Create Room Type
                
                staffMembers.forEach((staff, i) => console.log(`[${i+1}] ${staff}`));
                rl.question("Enter Staff for this Room Type: ", num => {
                    const index = parseInt(num.trim()) - 1;
                if(staffMembers[index]) {
                    console.log(`You have chosen ${staffMembers[index]} for this Room Type.`)
                    rl.question("Enter Room Type name: ", name => {
                    const rt = new RoomType(name.trim(), staffMembers[index]); 
                    roomTypes.push(rt); 
                    console.log("Room Type created!");
                    managerMenuInterface(manager); 
                    return;
                });
                } else {
                    console.log("invalid staff.")
                    managerMenuInterface(manager);
                }              
                    });
                break;

            case "2": // Add Room to Room Type
                if(roomTypes.length === 0) { 
                    console.log("No Room Types exist."); 
                    managerMenuInterface(manager); 
                } else {
                    roomTypes.forEach((rt,i)=>console.log(`[${i+1}] ${rt.typeName}`)); 
                    rl.question("Select Room Type number: ", num => {
                        const rtIndex = parseInt(num.trim()) - 1;
                        const selectedRT = roomTypes[rtIndex]; 
                        if(!selectedRT) { 
                            console.log("Invalid."); 
                            managerMenuInterface(manager); 
                            return; 
                        }

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
                customers.forEach((customer,i) => console.log(`${[i + 1]} ${customer.name}`));
                rl.question("Which costumer do you want to remove: ", num => {
                const index = parseInt(num.trim() - 1);
                customers.pop(index - 1)
                console.log(`${customers[index - 1]} has been removed.`)
                managerMenuInterface(manager)
                });
                break;

            case "4": 
                mainMenu(); 
                break;

            case "5": 
                mainMenu(); 
                break;

            default: 
                console.log("Invalid choice.");
                managerMenuInterface(manager);
        }
    });
}


// ----------------------
// ADD USERS FUNCTIONS
// ----------------------

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


// ----------------------
// START PROGRAM
// ----------------------

mainMenu(); // Entry point — starts the program and shows main menu
