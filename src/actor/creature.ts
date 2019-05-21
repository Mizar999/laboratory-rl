import { Actor, ActorType } from "./actor";
import { Breed } from "./breed";
import { Point } from "../util/point";
import { Command } from "../command/command";
import { Game } from "../game";
import { Category } from "../combat/category";

export class Creature extends Actor {
    health: number;

    constructor(position: Point, public breed: Breed) {
        super(ActorType.Creature, breed.visual);
        this.position = position;
        this.health = breed.maxHealth;
    }

    takeTurn(game: Game): Promise<Command> {
        return this.breed.ai.nextAction(game, this);
    }

    wearsArmor(): boolean {
        return this.breed.defenses.some(breedDefense => {
            let defense = breedDefense.getDefense();
            return defense.getCategory() !== Category.Special && defense.getArmor() > 0;
        });
    }

    describe(): string {
        return this.breed.name;
    }
}