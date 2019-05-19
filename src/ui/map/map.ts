import { RNG, Path } from "rot-js";
import AStar from "rot-js/lib/path/astar";

import { Game } from "../../game";
import { Tile } from "./tile";
import { Point } from "../../util/point";
import { BlockType } from "./block-type";
import { Actor } from "../../actor/actor";

export class Map {
    private floor: { [key: string]: Tile };
    private path: Point[];

    constructor(private game: Game) {
        this.floor = {};
    }

    draw(): void {
        for (let key in this.floor) {
            this.game.draw(Point.fromKey(key), this.floor[key].visual);
        }
        for (let actor of this.game.getActors()) {
            this.game.draw(actor.position, actor.visual);
        }
    }

    generateMap(width: number, height: number): void {
        this.floor = {};
        for (let x = 0; x < width; ++x) {
            for (let y = 0; y < height; ++y) {
                if (x == 0 || x == width - 1 || y == 0 || y == height - 1) {
                    this.floor[this.toKey(x, y)] = Tile.Wall;
                } else {
                    this.floor[this.toKey(x, y)] = Tile.Floor;
                }
            }
        }
    }

    getRandomPassablePositions(numberOf: number = 1): Point[] {
        let buffer: Point[] = [];
        let result: Point[] = [];
        let position: Point;
        for (let key in this.floor) {
            position = Point.fromKey(key);
            if (this.isPassable(position)) {
                buffer.push(position);
            }
        }

        let index: number;
        while (buffer.length > 0 && result.length < numberOf) {
            index = Math.floor(RNG.getUniform() * buffer.length);
            result.push(buffer.splice(index, 1)[0]);
        }
        return result;
    }

    getTileAt(position: Point): Tile {
        return this.floor[position.toKey()];
    }

    getActortAt(position: Point): Actor {
        for (let actor of this.game.getActors()) {
            if (position.equals(actor.position)) {
                return actor;
            }
        }
    }

    isPassable(position: Point): boolean {
        return this.isPassableFloor(position) && !this.isOccupiedByActor(position);
    }

    isPassableFloor(position: Point): boolean {
        let key = position.toKey();
        if (key in this.floor) {
            return this.floor[key].blocks != BlockType.BlocksMovement;
        }
        return false;
    }

    isOccupiedByActor(position: Point): boolean {
        let actor = this.getActortAt(position);
        if (actor) {
            return true;
        }
        return false;
    }

    getPath(source: Point, target: Point, topology: 4 | 6 | 8 = 8, passableCallback: (map: Map, x: number, y: number) => boolean = undefined): ReadonlyArray<Point> {
        let aStar: AStar;
        if (passableCallback) {
            aStar = new Path.AStar(target.x, target.y, (x: number, y: number) => passableCallback(this, x, y), { topology: topology });
        } else {
            aStar = new Path.AStar(target.x, target.y, (x: number, y: number) => this.passableCallback(source, x, y), { topology: topology });
        }
        this.path = [];
        aStar.compute(source.x, source.y, this.pathCallback.bind(this));
        if (this.path.length > 0) {
            this.path.shift(); // Remove the source position
        }
        return this.path;
    }

    private toKey(x: number, y: number): string {
        return x + "," + y;
    }

    private passableCallback(source: Point, x: number, y: number): boolean {
        let target = new Point(x, y);
        if (source.equals(target)) {
            return true;
        }
        return this.isPassable(target);
    }

    private pathCallback(x: number, y: number): void {
        this.path.push(new Point(x, y));
    }
}