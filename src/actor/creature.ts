import { Actor, ActorType } from "./actor";
import { Breed } from "./breed";
import { Point } from "../util/point";

export class Creature extends Actor {
    health: number;

    constructor(position: Point, public breed: Breed) {
        super(ActorType.Creature, breed.visual);
        this.position = position;
        this.health = breed.maxHealth;
    }
}