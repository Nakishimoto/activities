const readline = require("readline");

class Player {
    #health;

    constructor(name, health = 100) {
        this.name = name;
        this.#health = health;
    }

    get health() {
        return this.#health;
    }

    set health(value) {
        this.#health = Math.max(0, value);
    }

    attack() {
        return Math.floor(Math.random() * 11) + 10;
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(`${this.name} takes ${amount} damage! Health: ${this.health}`);
    }

    isAlive() {
        return this.health > 0;
    }
}

class Warrior extends Player {
    attack() {
        return Math.floor(Math.random() * 16) + 5;
    }
}

class Mage extends Player {
    attack() {
        return Math.floor(Math.random() * 6) + 10;
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startBattle(player1, player2) {
    let attacker = player1;
    let defender = player2;
    let round = 1;

    console.log(`=== Battle Start: ${player1.name} vs ${player2.name} ===`);
    console.log("-------------------------------------------");

    function nextTurn() {
        if (!player1.isAlive() || !player2.isAlive()) {
            console.log("Battle has ended!");
            rl.close();
            return;
        }

        console.log(`Round ${round}: ${attacker.name}'s turn!`);
        rl.question("Type 'attack' to strike: ", (input) => {
            input = input.trim().toLowerCase();

            if (input === "attack") {
                const damage = attacker.attack();
                console.log(`${attacker.name} attacks ${defender.name} for ${damage} damage!`);
                defender.takeDamage(damage);

                if (!defender.isAlive()) {
                    console.log(`${attacker.name} wins the battle!`);
                    rl.close();
                    return;
                }

                [attacker, defender] = [defender, attacker];
                round++;
                console.log("-------------------------------------------");
                nextTurn();
            } else {
                console.log("Invalid command. Please type 'attack' to continue.");
                nextTurn();
            }
        });
    }

    nextTurn();
}

const player1 = new Warrior("Aragon");
const player2 = new Mage("Merlin");

startBattle(player1, player2);
