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
        if(!game.getMap().isPassable(newPoint)) {
            return this.fail(`'${this.actor.constructor.name}' cannot move to ${newPoint.toString()}`);
        }
        this.actor.position = newPoint;
        return this.success();
    }
}