import { Entity } from "../ui/entity";
import { Visual } from "../ui/visual";
import { BlockType } from "../ui/map/block-type";
import { Point } from "../util/point";
import { Command } from "../command/command";
import { Creature } from "./creature";

export const enum ActorType {
    Player,
    Creature
}

export class Actor extends Entity {
    position: Point;

    constructor(public readonly type: ActorType, visual: Visual) {
        super(visual, BlockType.BlocksMovement);
    }

    takeTurn(): Promise<Command> {
        return Promise.resolve(new Command());
    }

    describe(): string {
        switch (this.type) {
            case ActorType.Creature:
                let creature = <Creature>(this as unknown);
                return creature.breed.name;
            default:
                return this.constructor.name;
        }
    }
}