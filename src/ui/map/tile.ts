import { Entity } from "../entity";
import { Visual } from "../visual";
import { BlockType } from "./block-type";

export const enum TileType {
    Floor,
    Wall
}

export class Tile extends Entity {
    public static readonly Floor = new Tile(TileType.Floor, new Visual(".", "white"), BlockType.BlocksNone);
    public static readonly Wall = new Tile(TileType.Wall, new Visual("#", "white"), BlockType.BlocksMovement);

    constructor(public readonly type: TileType, visual: Visual, blocks?: BlockType) {
        super(visual, blocks);
    }
}