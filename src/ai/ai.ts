import { Game } from "../game";
import { Actor } from "../actor/actor";
import { Command } from "../command/command";
import { MeleeAI } from "./melee-ai";

export class AI {
    nextAction(game: Game, source: Actor): Promise<Command> {
        return Promise.resolve(new Command());
    }
}