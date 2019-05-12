import { Entity } from "../ui/entity";
import { Visual } from "../ui/visual";
import { BlockType } from "../ui/map/block-type";
import { Point } from "../util/point";

export const enum ActorType {
    Player,
    Enemy
}

export class Actor extends Entity {
    position: Point;

    constructor(public readonly type: ActorType, visual: Visual) {
        super(visual, BlockType.BlocksMovement);
    }
}