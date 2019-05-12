import { Game } from "../../game";
import { Tile } from "./tile";
import { Actor } from "../../actor/actor";
import { Point } from "../../util/point";
import { BlockType } from "./block-type";

export class Map {
    private floor: { [key: string]: Tile };
    private beings: { [key: string]: Actor };

    constructor(private game: Game) {
        this.floor = {};
        this.beings = {};
    }

    isPassable(point: Point): boolean {
        return this.isPassableFloor(point) && !this.isOccupiedByBeing(point);
    }

    isPassableFloor(point: Point): boolean {
        let passable = false;
        let key = point.toKey();
        if (key in this.floor) {
            passable = this.floor[key].blocks != BlockType.BlocksMovement;
        }
        return passable;
    }

    isOccupiedByBeing(point: Point): boolean {
        let occupied = false;
        let key = point.toKey();
        if (key in this.beings) {
            occupied = this.beings[key].blocks == BlockType.BlocksMovement;
        }
        return occupied;
    }
}