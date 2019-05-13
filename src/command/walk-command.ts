import { Command, CommandResult } from "./command";
import { Game } from "../game";
import { Actor } from "../actor/actor";
import { Point } from "../util/point";

export class WalkCommand extends Command {
    constructor(private actor: Actor, private dirX: number, private dirY: number) {
        super();
    }

    execute(game: Game): Promise<CommandResult> {
        let newPoint = new Point(this.actor.position.x + this.dirX, this.actor.position.y + this.dirY);
        let map = game.getMap();

        if (!map.isPassable(newPoint)) {
            return this.wait(`'${this.actor.constructor.name}' cannot move to ${newPoint.toString()}`);
        }

        let actor = map.getActortAt(newPoint);
        if (actor) {
            return this.fail(`'${this.actor.constructor.name}' bumps into '${actor.constructor.name}'`);
        }

        this.actor.position = newPoint;
        return this.success();
    }
}