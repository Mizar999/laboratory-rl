import { Defense } from "./defense";

export class BreedDefense {
    constructor(private defense: Defense, private difficulty: number = undefined) { }

    getDefense(): Defense {
        return this.defense;
    }

    getDifficulty(): number {
        return this.difficulty;
    }
}