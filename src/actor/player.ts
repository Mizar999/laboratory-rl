import { Actor, ActorType } from "./actor";
import { Point } from "../util/point";
import { Visual } from "../ui/visual";

export class PlayerStat {
    value: number;

    constructor(public max: number, public boostSave?: number) {
        this.value = max;
        if (boostSave === undefined) {
            this.boostSave = 0;
        }
    }

    toPercent(): number {
        if (this.max == 0) {
            return 0;
        }
        return (this.value / this.max) * 100;
    }

    toString(): string {
        return `${this.value} / ${this.max} (${this.boostSave})`;
    }
}

export class Player extends Actor {
    strength: PlayerStat;
    speed: PlayerStat;
    mind: PlayerStat;
    maxBoost: number;

    constructor(position: Point) {
        super(ActorType.Player, new Visual("@", "white"));
        this.position = position;
    }
}