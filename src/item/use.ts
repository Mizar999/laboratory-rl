import { Game } from "../game";
import { Actor } from "../actor/actor";

export abstract class Use {
    abstract prepare(game: Game, source: Actor): boolean;

    abstract evaluate(): number;

    abstract use(): void;
}