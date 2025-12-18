class Player {
    #health;

    constructor(name, health = 100) {
        this.name = name;
        this.#health = health;
    }

    setHealth(amount) {
        this.#health = amount;
    }

    getHealth() {
        return this.#health;
    }

    attack() {
        return 10;
    }

    takeDamage(amount) {
        this.#health -= amount;
    }

    showStatus(name,health) {
        console.log(`Player: ${this.name} | Health: ${this.getHealth()}`)
    }
}

class Mage extends Player {
    
    attack() {
        return 5;
    }
}

class Warrior extends Player {
    
    attack() {
        return 8;
    }
}

function startBattle(player1, player2) {
    let attacker = player1;
    let defender = player2;
    let i = 1;

    console.log("Battle Start!\n")

    while (defender.getHealth() > 0) {
    const damage = attacker.attack();
    defender.takeDamage(damage);

    console.log(`Round: ${i}`);
    console.log(`${defender.name} took ${damage} damage! | Health: ${defender.getHealth()}`);

    if (defender.getHealth() <= 0) {
        console.log(`\n${attacker.name} wins the game!`);
        break;
    }

    [attacker, defender] = [defender, attacker];
    i++;
}

}

const player1 = new Mage("Bomboclat");
const player2 = new Warrior("Mi Bombooo");

startBattle(player1, player2);