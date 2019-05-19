import { Actor, ActorType } from "./actor";
import { Breed } from "./breed";
import { Point } from "../util/point";
import { Command } from "../command/command";
import { Game } from "../game";

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

    describe(): string {
        return this.breed.name;
    }
}