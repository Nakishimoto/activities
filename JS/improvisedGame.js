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
        console.log(`${this.name} takes ${amount} damage! Health left: ${this.health}`);
    }

    isAlive() {
        return this.#health > 0;
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

class Battle {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.attacker = player1;
        this.defender = player2;
        this.round = 1;
        this.ended = false;

        console.log(`=== Battle Start: ${player1.name} vs ${player2.name} ===`);
        this.showStatus();
    }

    nextTurn() {
        if (this.ended) {
            console.log("⚔️ Battle already ended.");
            return;
        }

        console.log(`\n--- Round ${this.round}: ${this.attacker.name}'s turn! ---`);

        const damage = this.attacker.attack();
        console.log(`${this.attacker.name} attacks ${this.defender.name} for ${damage} damage!`);
        this.defender.takeDamage(damage);

        if (!this.defender.isAlive()) {
            console.log(`🏆 ${this.attacker.name} wins the battle!`);
            this.ended = true;
            this.showStatus();
            return;
        }

        [this.attacker, this.defender] = [this.defender, this.attacker];
        this.round++;
        this.showStatus();
    }

    showStatus() {
        console.log(`❤️ ${this.player1.name}: ${this.player1.health} HP`);
        console.log(`💙 ${this.player2.name}: ${this.player2.health} HP`);
    }
}

// Create the players and battle ONCE
const player1 = new Warrior("Aragon");
const player2 = new Mage("Merlin");
const battle = new Battle(player1, player2);

// Now call nextTurn() manually — each call continues the same game
battle.nextTurn();
battle.nextTurn();

