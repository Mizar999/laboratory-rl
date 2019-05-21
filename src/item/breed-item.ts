import { Item } from "./item";

export class BreedItem {
    constructor(private item: Item, private difficulty = undefined) { }

    getItem(): Item {
        return this.item;
    }

    getDifficulty(): number {
        return this.difficulty;
    }
}