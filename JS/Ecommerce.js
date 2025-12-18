// Abstract-like Base Class
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // Abstract-like method
  getRole() {
    throw new Error("getRole() must be implemented by subclass");
  }
}

// Product Class with Encapsulation
class Product {
  #price; // private property

  constructor(name, price, category) {
    this.name = name;
    this.#price = price;
    this.category = category;
  }

  // Getter and Setter for price
  get price() {
    return this.#price;
  }

  set price(value) {
    if (value > 0) {
      this.#price = value;
    } else {
      console.log("❌ Price must be greater than 0");
    }
  }

  showDetails() {
    console.log(`🛒 Product: ${this.name}`);
    console.log(`   Category: ${this.category}`);
    console.log(`   Price: ₱${this.#price}`);
  }
}

// Customer Class extending User
class Customer extends User {
  constructor(name, email) {
    super(name, email);
    this.cart = null; // will hold ShoppingCart later
  }

  displayCustomerInfo() {
    console.log(`👤 Customer: ${this.name}`);
    console.log(`   Email: ${this.email}`);
  }

  getRole() {
    return "Customer";
  }
}

// Admin Class (Inheritance)
class Admin extends User {
  constructor(name, email, accessLevel) {
    super(name, email);
    this.accessLevel = accessLevel;
  }

  getRole() {
    return `Admin (Access Level: ${this.accessLevel})`;
  }
}

// Order Class
class Order {
  constructor(orderId, customer, products = []) {
    this.orderId = orderId;
    this.customer = customer;
    this.products = products;
  }

  showOrderDetails() {
    console.log(`\n📦 Order ID: ${this.orderId}`);
    console.log(`Customer: ${this.customer.name}`);
    console.log("Items:");

    let total = 0;
    this.products.forEach((p) => {
      console.log(` - ${p.name} (₱${p.price})`);
      total += p.price;
    });

    console.log(`Total Amount: ₱${total}`);
  }
}

// Polymorphism Function
function showUserRole(user) {
  console.log(`Role of ${user.name}: ${user.getRole()}`);
}

// ShoppingCart Class
class ShoppingCart {
  constructor(customer) {
    this.customer = customer;
    this.items = [];
  }

  addItem(product) {
    this.items.push(product);
    console.log(`✅ Added "${product.name}" to ${this.customer.name}'s cart`);
  }

  checkout() {
    let total = 0;
    console.log(`\n🧾 Checkout for ${this.customer.name}:`);
    this.items.forEach((item) => {
      console.log(` - ${item.name}: ₱${item.price}`);
      total += item.price;
    });
    console.log(`Total to Pay: ₱${total}`);
    return total;
  }
}

// Create Products
const product1 = new Product("Laptop", 35000, "Electronics");
const product2 = new Product("Mouse", 500, "Accessories");
const product3 = new Product("Keyboard", 1200, "Accessories");

// Create Customer and Admin
const customer1 = new Customer("Alice", "alice@email.com");
const admin1 = new Admin("Bob", "admin@email.com", "Full Access");

// Show Roles (Polymorphism)
showUserRole(customer1);
showUserRole(admin1);

// Assign ShoppingCart to Customer
customer1.cart = new ShoppingCart(customer1);

// Add Products to Cart
customer1.cart.addItem(product1);
customer1.cart.addItem(product2);
customer1.cart.addItem(product3);

// Checkout and Create Order
const totalAmount = customer1.cart.checkout();
const order1 = new Order("ORD-001", customer1, customer1.cart.items);

// Show Order Details
order1.showOrderDetails();

// Display Customer Info
customer1.displayCustomerInfo();

// Display Products (Encapsulation Test)
console.log("\n🧩 Encapsulation Check:");
product1.showDetails();
product2.showDetails();
product3.showDetails();

// Try invalid price
product1.price = -100; // should show validation message

console.log("\n✅ Program Finished Successfully!");

