import { KEYS, DIRS } from "rot-js";
import { Actor, ActorType } from "./actor";
import { Point } from "../util/point";
import { Visual } from "../ui/visual";
import { ServiceLocator } from "../service-locator";
import { Command } from "../command/command";
import { WalkCommand } from "../command/walk-command";

export class Player extends Actor {
    strength: PlayerStat;
    speed: PlayerStat;
    mind: PlayerStat;
    maxBoost: number;

    private keyMap: { [key: number]: number }
    private command: Command;

    constructor(position: Point) {
        super(ActorType.Player, new Visual("@", "white"));
        this.position = position;

        this.keyMap = {};
        this.keyMap[KEYS.VK_NUMPAD8] = 0; // up
        this.keyMap[KEYS.VK_NUMPAD9] = 1;
        this.keyMap[KEYS.VK_NUMPAD6] = 2; // right
        this.keyMap[KEYS.VK_NUMPAD3] = 3;
        this.keyMap[KEYS.VK_NUMPAD2] = 4; // down
        this.keyMap[KEYS.VK_NUMPAD1] = 5;
        this.keyMap[KEYS.VK_NUMPAD4] = 6; // left
        this.keyMap[KEYS.VK_NUMPAD7] = 7;
    }

    async takeTurn(): Promise<Command> {
        this.command = undefined;
        await ServiceLocator.getInputUtility().waitForInput(this.handleInput.bind(this));
        return this.command;
    }

    handleInput(event: KeyboardEvent): boolean {
        let code = event.keyCode;
        if (code in this.keyMap) {
            let diff = DIRS[8][this.keyMap[code]];
            this.command = new WalkCommand(this, diff[0], diff[1]);
        }
        return this.command !== undefined;
    }
}

export class PlayerStat {
    value: number;

    constructor(public max: number, public boostSave: number = 0) {
        this.value = max;
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