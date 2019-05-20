import { RNG } from "rot-js";
import { Attack } from "./attack";

export class BreedAttack {
    constructor(private attack: Attack, private difficulty: number = undefined, private probabilityWeight: number = 1) { }

    getAttack(): Attack {
        return this.attack;
    }

    getDifficulty(): number {
        return this.difficulty;
    }

    getProbabilityWeight(): number {
        return this.probabilityWeight;
    }
}