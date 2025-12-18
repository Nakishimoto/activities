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
    getPrice() { return this.#price; }
    setPrice(person, price) {
        if (person.access === "full") {
            this.#price = price;
            console.log(`Room ${this.roomCode} price updated.`);
        } else {
            console.log("You don't have permission to do that.");
        }
    }
    showRoomDetails() {
        console.log(`Room Code: ${this.roomCode}`);
        console.log(`Capacity: ${this.capacity}`);
        console.log(`Price: $${this.getPrice()}`);
        console.log(`Status: ${this.status}\n`);
    }
}

class RoomType {
    constructor(typeName, staff) {
        this.typeName = typeName;
        this.staff = staff;
        this.rooms = [];
    }
    addRoom(room) {
        if (room.getPrice() <= 0) {
            console.log("Price must be greater than 0.");
            return;
        }
        this.rooms.push(room);
        console.log(`Added room ${room.roomCode} to ${this.typeName}.`);
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

const ask = (q) => new Promise(resolve => rl.question(q, ans => resolve(ans)));

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
    console.log("[3] Display Role");
    console.log("[4] Back to Main Menu");
}

function showManagerMenu() {
    console.log("\n=== MANAGER MENU ===");
    console.log("[1] Create Room Type");
    console.log("[2] Add Room to Room Type");
    console.log("[3] Display Bookings");
    console.log("[4] Remove a customer");
    console.log("[5] Remove a staff");
    console.log("[6] Change Room price");
    console.log("[7] Display Role");
    console.log("[8] Back to Main Menu");
}

async function mainMenu() {
    showMainMenu();
    const answer = (await ask("Enter choice: ")).trim();
    switch(answer) {
        case "1":
            if (customers.length === 0) {
                console.log("No customers exist. Add one first.");
                await mainMenu();
            } else {
                await chooseCustomer();
            }
            break;
        case "2":
            if (managers.length === 0) {
                console.log("No managers exist. Add one first.");
                await mainMenu();
            } else {
                await chooseManager();
            }
            break;
        case "3":
            await addCustomer();
            break;
        case "4":
            await addStaff();
            break;
        case "5":
            await addManager();
            break;
        case "6":
            if (customers.length === 0) {
                console.log("Add a Customer first.");
                await mainMenu();
            } else {
                customers.forEach((m, i) => console.log(`Customer\\s: \n [${i+1}] `+m.name))
                await mainMenu();
            }
            break;
        case "7":
            if (staffMembers.length === 0) {
                console.log("Add a Staff first.");
                await mainMenu();
            } else {
                staffMembers.forEach((m, i) => console.log(`Staff\\s: \n [${i+1}] `+m.name))
                await mainMenu();
            }
            break;
        case "8":
            if (managers.length === 0) {
                console.log("Add a Manager first.");
                await mainMenu();
            } else {
                managers.forEach((m, i) => console.log(`Manager\\s \n [${i+1}] `+m.name));
                await mainMenu();
            }
            break;
        case "9":
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid choice.");
            await mainMenu();
    }
}

async function chooseCustomer() {
    console.log("Select Customer:");
    customers.forEach((c, i) => console.log(`[${i+1}] ${c.name}`));
    const num = await ask("Enter number: ");
    const index = parseInt(num.trim()) - 1;
    if (customers[index]) await customerMenuInterface(customers[index]);
    else { console.log("Invalid customer."); await mainMenu(); }
}

async function customerMenuInterface(customer) {
    showCustomerMenu();
    const answer = (await ask("Enter choice: ")).trim();
    switch(answer) {
        case "1":
            if (roomTypes.length === 0) console.log("No room types exist.");
            else roomTypes.forEach(rt => rt.showRoomTypeDetails());
            await customerMenuInterface(customer);
            break;
        case "2":
            await bookRoom(customer);
            break;
            case "3":
                 customer.displayRole();
                 customerMenuInterface(customer);
            break;
        case "4":
            await mainMenu();
            break;
        default:
            console.log("Invalid choice.");
            await customerMenuInterface(customer);
    }
}

async function bookRoom(customer) {
    if (roomTypes.length === 0) {
        console.log("No room types available.");
        await customerMenuInterface(customer);
        return;
    }

    console.log("\nSelect a Room Type:");
    roomTypes.forEach((rt, i) => console.log(`[${i+1}] ${rt.typeName}`));
    const rtNum = await ask("Enter number: ");
    const rtIndex = parseInt(rtNum.trim()) - 1;
    const selectedRT = roomTypes[rtIndex];

    if (!selectedRT || selectedRT.rooms.length === 0) {
        console.log("Invalid choice or no rooms available in this type.");
        await customerMenuInterface(customer);
        return;
    }

    console.log("\nSelect a Room:");
    selectedRT.rooms.forEach((room, i) => {
        console.log(`[${i+1}] ${room.roomCode} - Capacity: ${room.capacity}, Price: $${room.getPrice()} - ${room.status}`);
    });

    const roomNum = await ask("Enter number: ");
    const roomIndex = parseInt(roomNum.trim()) - 1;
    const selectedRoom = selectedRT.rooms[roomIndex];

    if (!selectedRoom) {
        console.log("Invalid Room choice.");
        await customerMenuInterface(customer);
        return;
    }

    if (selectedRoom.status !== "available") {
        console.log("Room is already booked.");
        await customerMenuInterface(customer);
        return;
    }

    const daysInput = await ask("Enter number of days to book: ");
    const days = parseInt(daysInput.trim());

    if (isNaN(days) || days <= 0) {
        console.log("Invalid number of days.");
        await customerMenuInterface(customer);
        return;
    }

    const total = selectedRoom.getPrice() * days;
    const checkIn = new Date();
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + days);

    bookings.push({
        customer: customer.name,
        roomType: selectedRT.typeName,
        roomCode: selectedRoom.roomCode,
        days,
        total,
        checkIn,
        checkOut
    });

    selectedRoom.status = "booked";

    console.log(`\nBooking Summary:`);
    console.log(`Customer: ${customer.name}`);
    console.log(`Room Type: ${selectedRT.typeName}`);
    console.log(`Room Code: ${selectedRoom.roomCode}`);
    console.log(`Price per night: $${selectedRoom.getPrice()}`);
    console.log(`Number of days: ${days}`);
    console.log(`Total Price: $${total}`);
    console.log(`Check-in: ${checkIn.toLocaleString()}`);
    console.log(`Check-out: ${checkOut.toLocaleString()}\n`);
    console.log("Booking successful!");

    await customerMenuInterface(customer);
}

async function chooseManager() {
    console.log("Select Manager:");
    managers.forEach((m, i) => console.log(`[${i+1}] ${m.name}`));
    const num = await ask("Enter number: ");
    const index = parseInt(num.trim()) - 1;
    if (managers[index]) await managerMenuInterface(managers[index]);
    else { console.log("Invalid manager."); await mainMenu(); }
}

async function managerMenuInterface(manager) {
    showManagerMenu();
    const answer = (await ask("Enter choice: ")).trim();
    switch(answer) {
        case "1":
            if (staffMembers.length === 0) {
                console.log("Add a staff first.");
                await managerMenuInterface(manager);
                return;
            }
            staffMembers.forEach((staff, i) => console.log(`[${i+1}] ${staff.name}`));
            {
                const num = await ask("Enter Staff for this Room Type: ");
                const index = parseInt(num.trim()) - 1;
                if (!staffMembers[index]) {
                    console.log("Invalid staff.");
                    await managerMenuInterface(manager);
                    return;
                }
                console.log(`You have chosen ${staffMembers[index].name} for this Room Type.`);
                const name = (await ask("Enter Room Type name: ")).trim();
                const rtName = name;
                const exists = roomTypes.some(rt => rt.typeName.toLowerCase() === rtName.toLowerCase());
                if (exists) {
                    console.log(`Room Type "${rtName}" already exists.\n`);
                    await managerMenuInterface(manager);
                    return;
                }
                const newRT = new RoomType(rtName, staffMembers[index]);
                roomTypes.push(newRT);
                console.log(`Room Type "${rtName}" created successfully!`);
                await managerMenuInterface(manager);
            }
            break;
        case "2":
            if (roomTypes.length === 0) {
                console.log("No Room Types exist.");
                await managerMenuInterface(manager);
                return;
            }
            roomTypes.forEach((rt, i) => console.log(`[${i+1}] ${rt.typeName}`));
            {
                const num = await ask("Select Room Type number: ");
                const rtIndex = parseInt(num.trim()) - 1;
                const selectedRT = roomTypes[rtIndex];
                if (!selectedRT) {
                    console.log("Invalid.");
                    await managerMenuInterface(manager);
                    return;
                }
                const code = (await ask("Enter Room Code: ")).trim();
                const cap = parseInt((await ask("Enter Capacity: ")).trim());
                const price = parseFloat((await ask("Enter Price: ")).trim());
                if (isNaN(cap) || cap <= 0) {
                    console.log("Invalid capacity.");
                    await managerMenuInterface(manager);
                    return;
                }
                if (isNaN(price) || price <= 0) {
                    console.log("Invalid price.");
                    await managerMenuInterface(manager);
                    return;
                }
                const room = new Room(code, cap, price);
                selectedRT.addRoom(room);
                await managerMenuInterface(manager);
            }
            break;
        case "3":
            if (bookings.length > 0) {
                bookings.forEach((b, i) => {
                    console.log(`\nBooking #${i+1}`);
                    console.log(`Customer: ${b.customer}`);
                    console.log(`Room Type: ${b.roomType}`);
                    console.log(`Room Code: ${b.roomCode}`);
                    console.log(`Number of days: ${b.days}`);
                    console.log(`Total Price: $${b.total}`);
                    console.log(`Check-in: ${b.checkIn.toLocaleString()}`);
                    console.log(`Check-out: ${b.checkOut.toLocaleString()}\n`);
                });
                await managerMenuInterface(manager);
            } else {
                console.log("There are no Bookings to display.");
                await managerMenuInterface(manager);
            }
            break;
        case "4":
            if (customers.length > 0) {
                customers.forEach((c, i) => console.log(`[${i+1}] ${c.name}`));
                {
                    const num = await ask("Enter Customer to remove: ");
                    const index = parseInt(num.trim()) - 1;
                    if (!customers[index]) {
                        console.log("Invalid choice.");
                        await managerMenuInterface(manager);
                        return;
                    }
                    console.log(`${customers[index].name} has been removed.`);
                    customers.splice(index, 1);
                    await managerMenuInterface(manager);
                }
            } else {
                console.log("There are no customers to remove.");
                await managerMenuInterface(manager);
            }
            break;
        case "5":
            if (staffMembers.length > 0) {
                staffMembers.forEach((c, i) => console.log(`[${i+1}] ${c.name}`));
                {
                    const num = await ask("Enter Staff to remove: ");
                    const index = parseInt(num.trim()) - 1;
                    if (!staffMembers[index]) {
                        console.log("Invalid choice.");
                        await managerMenuInterface(manager);
                        return;
                    }
                    console.log(`${staffMembers[index].name} has been removed.`);
                    staffMembers.splice(index, 1);
                    await managerMenuInterface(manager);
                }
            } else {
                console.log("There are no staff to remove.");
                await managerMenuInterface(manager);
            }
            break;
        case "6":
            if (roomTypes.length === 0) {
                console.log("Add a Room Type first.\n");
                await managerMenuInterface(manager);
                return;
            }
            roomTypes.forEach((rt, i) => console.log(`\n[${i+1}] ${rt.typeName}`));
            {
                const num = await ask("Select a Room Type: ");
                const rtIndex = parseInt(num.trim()) - 1;
                const rtChoice = roomTypes[rtIndex];
                if (!rtChoice) {
                    console.log("Invalid Room Type selection.");
                    await managerMenuInterface(manager);
                    return;
                }
                rtChoice.rooms.forEach((room, i) => {
                    console.log(`\nRoom#${i+1}`);
                    room.showRoomDetails();
                });
                const crp = await ask("Change the price for which room: ");
                const roomIndex = parseInt(crp.trim()) - 1;
                const crpChoice = rtChoice.rooms[roomIndex];
                if (!crpChoice) {
                    console.log("Invalid Room selection.");
                    await managerMenuInterface(manager);
                    return;
                }
                const oldPrice = crpChoice.getPrice();
                const changePrice = await ask("Change price to: ");
                const newPrice = parseFloat(changePrice.trim());
                if (isNaN(newPrice) || newPrice <= 0) {
                    console.log("Invalid price.");
                    await managerMenuInterface(manager);
                    return;
                }
                crpChoice.setPrice(manager, newPrice);
                console.log(`The price for Room: ${crpChoice.roomCode} has been updated from $${oldPrice} to $${newPrice}`);
                await managerMenuInterface(manager);
            }
            break;
        case "7":
            manager.displayRole();
            managerMenuInterface(manager);
            break;
        case "8":
            await mainMenu();
            break;
        default:
            console.log("Invalid choice.");
            await managerMenuInterface(manager);
    }
}

async function addCustomer() {
    const name = (await ask("Enter Customer name: ")).trim();
    if (!name) { console.log("Invalid name."); await mainMenu(); return; }
    const c = new Customer(name);
    customers.push(c);
    console.log("Customer added!");
    await mainMenu();
}

async function addStaff() {
    const name = (await ask("Enter Staff name: ")).trim();
    if (!name) { console.log("Invalid name."); await mainMenu(); return; }
    const s = new Staff(name);
    staffMembers.push(s);
    console.log("Staff added!");
    await mainMenu();
}

async function addManager() {
    const name = (await ask("Enter Manager name: ")).trim();
    if (!name) { console.log("Invalid name."); await mainMenu(); return; }
    const m = new Manager(name);
    managers.push(m);
    console.log("Manager added!");
    await mainMenu();
}

mainMenu();
