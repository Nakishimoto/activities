class BankAccount {
    #balance;
    #name;
    
    constructor(accountHolder, initialBalance) {
        this.#name = accountHolder;
        this.#balance = initialBalance;
    }

    getName() {
        return this.#name;
    }

    deposit(amount) {
        this.#balance += amount;
        console.log(`$${amount} has been added to your account.`);
        this.accountDetails();
    }

    withdraw(amount) {
        if (this.#balance >= amount) {
            this.#balance -= amount;
            console.log(`$${amount} has been deducted from your account.`);
            this.accountDetails();
            return true;
        } else {
            console.log(`Insufficient funds.`);
            console.log(`Your balance is $${this.#balance} and you're trying to withdraw $${amount}.`);
            return false;
        }
    }

    transfer(amount, targetAccount) {
        if(this.withdraw(amount)) {
            targetAccount.deposit(amount);
            console.log(`$${amount} has been transferred to ${targetAccount.getName()}'s account`);
        }
    }

    accountDetails() {
        console.log(`Name: ${this.#name}, Balance: $${this.#balance}\n`);
    }
}

class BDO extends BankAccount {
    constructor(accountHolder,initialBalance) {
    super(accountHolder,initialBalance) }
}

class BPI extends BankAccount {
    constructor(accountHolder,initialBalance) {
    super(accountHolder,initialBalance) }
}

const account1 = new BDO(`Xiron`, 5000);
const account2 = new BPI(`Naki`, 5000);

account1.deposit(5000);
account1.withdraw(10000);
account2.transfer(5000, account1);