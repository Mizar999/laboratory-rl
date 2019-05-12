import { Visual } from "./visual";
import { BlockType } from "./map/block-type";

export class Entity {
    constructor(public readonly visual: Visual, public blocks?: BlockType) {
        if (blocks === undefined) {
            this.blocks = BlockType.BlocksNone;
        } else {
            this.blocks = blocks;
        }
    }
}