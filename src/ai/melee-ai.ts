import { AI } from "./ai";
import { Game } from "../game";
import { Actor, ActorType } from "../actor/actor";
import { Command } from "../command/command";
import { WalkCommand } from "../command/walk-command";

export class MeleeAI extends AI {
    nextAction(game: Game, source: Actor): Promise<Command> {
        let player = game.getActors().find(actor => actor.type == ActorType.Player);
        if (player) {
            let path = game.getMap().getPath(source.position, player.position);
            if (path.length > 0) {
                let dir = path[0].minus(source.position);
                return Promise.resolve(new WalkCommand(source, dir.x, dir.y));
            }
        }
        return Promise.resolve(new Command());
    }
}