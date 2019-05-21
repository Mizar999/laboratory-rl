import { KEYS, DIRS } from "rot-js";
import { Actor, ActorType } from "./actor";
import { PlayerStats, StatType } from "./player-stats";
import { Point } from "../util/point";
import { Visual } from "../ui/visual";
import { ServiceLocator } from "../util/service-locator";
import { Command } from "../command/command";
import { WalkCommand } from "../command/walk-command";
import { Game } from "../game";

export class Player extends Actor {
    private stats: PlayerStats;
    private keyMap: { [key: number]: number }
    private command: Command;

    constructor(position: Point) {
        super(ActorType.Player, new Visual("@", "white"));
        this.position = position;

        this.stats = new PlayerStats();

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

    getStats(): PlayerStats {
        return this.stats;
    }

    async takeTurn(game: Game): Promise<Command> {
        this.command = undefined;
        await ServiceLocator.getInputUtility().waitForInput(this.handleInput.bind(this));
        return this.command;
    }

    wearsArmor(): boolean {
        // TODO: define equipment / defenses
        return false;
    }

    private handleInput(event: KeyboardEvent): boolean {
        let code = event.keyCode;
        if (code in this.keyMap) {
            let diff = DIRS[8][this.keyMap[code]];
            this.command = new WalkCommand(this, diff[0], diff[1]);
        } else {
            switch (code) {
                case KEYS.VK_NUMPAD5:
                    this.command = new Command();
                    break;
                case KEYS.VK_1:
                    this.stats.changeStatValue(StatType.Strength, -1);
                    break;
                case KEYS.VK_2:
                    this.stats.changeStatValue(StatType.Strength, 1);
                    break;
                case KEYS.VK_3:
                    this.stats.changeStatValue(StatType.Speed, -1);
                    break;
                case KEYS.VK_4:
                    this.stats.changeStatValue(StatType.Speed, 1);
                    break;
                case KEYS.VK_5:
                    this.stats.changeStatValue(StatType.Mind, -1);
                    break;
                case KEYS.VK_6:
                    this.stats.changeStatValue(StatType.Mind, 1);
                    break;
            }
        }
        return this.command !== undefined;
    }
}