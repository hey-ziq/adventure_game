#! /usr/bin/env node

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//define a class reprsenting a player
class Player {
  private name: string;
  private health: number;
  private energy: number;

  constructor(name: string) {
    this.name = name;
    this.health = 100; //initial health
    this.energy = 100; //initial energy
  }
  //method to get player name
  getName(): string {
    return this.name;
  }

  //method to take player health
  getHealth(): number {
    return this.health;
  }
  //method to det player energy
  getEnergy(): number {
    return this.energy;
  }
  //method to decrease player health
  decreaseHealth(amount: number): void {
    this.health -= amount;
    if (this.health <= 0) {
      console.log(`${this.name} has been defeated!! Game over.`);
      rl.close();
    } else {
      console.log(`${this.name} has ${this.health} health remaining.`);
    }
  }
  //method to decrease player's energy
  decreaseEnergy(amount: number): void {
    this.energy -= amount;
    if (this.energy <= 0) {
      console.log(`${this.name} has run out of energy ! Game over.`);
      rl.close();
    } else {
      console.log(`${this.name} has ${this.energy} energy remaining.`);
    }
  }
}
//Define a class representing a Monster
class Monster {
  private name: string;
  private health: number;

  constructor(name: string) {
    this.name = name;
    this.health = 50; //initial Health
  }
  

  //Method to get monster's name
  getName(): string {
    return this.name;
  }

  //Method to get Monster Health
  getHealth(): number {
    return this.health;
  }

  //Method Representing A Monster Attack
  attack(player: Player): void {
    const damage = Math.floor(Math.random() * 10) + 1 ; //random damage between 1 - 10
    console.log(
      `${this.name} attacks ${player.getName()} for ${damage} damage.`
    );

    player.decreaseHealth(damage);
  }
  
}
//Create Instance of player and Monster
const player = new Player("Hero");
const monster = new Monster("Dragon");

//simulate a battle
console.log(`A wild ${monster.getName()} appears!!`);
function battle() {
  rl.question("Press Enter to attack: ", () => {
    const playerAttack = Math.floor(Math.random() * 20) + 1; // Random Attack between 1 - 20
    const energyConsumption = Math.floor(Math.random() * 10) + 1; //random energy consumption between 1 - 10
    player.decreaseEnergy(energyConsumption);
    console.log(
      `${player.getName()} attacks ${monster.getName()} for ${playerAttack} damage.`
    );
    monster.attack(player);
    if (player.getHealth() > 0 && player.getEnergy() > 0) {
      console.log(`=============================`);
      console.log(`Next Round: `);
      console.log(`Players's Health:${player.getHealth()}`);
      console.log(`Player's Energy: ${player.getEnergy()}`);
      console.log(`Monster's Health: ${monster.getHealth()}`);
      console.log(`=============================`);
      battle();
    } else {
      rl.close();
    }
  });
}
