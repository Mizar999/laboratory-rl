import { Display } from "rot-js/lib/index";
import { DisplayOptions } from "rot-js/lib/display/types";

import { MessageLog } from "./ui/messsage-log";
import { Sidebar, LineType } from "./ui/sidebar";
import { InputUtility } from "./util/input-utility";
import { ServiceLocator } from "./service-locator";

export class Game {
    private display: Display
    private displayOptions: Partial<DisplayOptions>;
    private messageLog: MessageLog;
    private sidebar: Sidebar;
    
    private turns = { max: 25, value: 25 };

    constructor() {
        this.displayOptions = {
            width: 50,
            height: 20,
            fontSize: 20,
            spacing: 1.1
        };
        this.display = new Display(this.displayOptions);
        document.getElementById("display").appendChild(this.display.getContainer());

        this.initialize();
        this.debug();
    }

    getMessageLog(): MessageLog {
        return this.messageLog;
    }

    getSidebar(): Sidebar {
        return this.sidebar;
    }

    private initialize(): void {
        ServiceLocator.provideInputUtility(new InputUtility());

        this.messageLog = new MessageLog(document.getElementById("messages"), 4);
        this.sidebar = new Sidebar(document.getElementById("sidebar"));
    }

    private debug(): Promise<any> {
        this.sidebar.setLine(LineType.HeaderPlayer, { Left: "@: Player" });
        this.sidebar.setLine(LineType.Strength, { Left: "Strength", Right: "11 / 11", BarPercent: 100, BarColor: "crimson" });
        this.sidebar.setLine(LineType.Speed, { Left: "Speed", Right: "10 / 10", BarPercent: 100, BarColor: "limegreen" });
        this.sidebar.setLine(LineType.Mind, { Left: "Mind", Right: "7 / 7", BarPercent: 100, BarColor: "cornflowerblue" });
        this.sidebar.setLine(LineType.HeaderEffects, { Left: "Effects" });
        this.sidebar.setLine(LineType.Poison, { Left: "Poison", Right: `${this.turns.value} ${this.turns.value == 1 ? "turn" : "turns"}`, BarPercent: ((this.turns.value / this.turns.max) * 100), BarColor: "slategray" });

        this.messageLog.addMessages("&nbsp;", "&nbsp;", "&nbsp;", "Press some keys ...");

        return ServiceLocator.getInputUtility().waitForInput(this.handleInput.bind(this));
    }

    private handleInput(event: KeyboardEvent): boolean {
        this.messageLog.addMessages(`Key '${event.code}' was pressed`);

        if (this.turns.value > 0) {
            --this.turns.value;
            if (this.turns.value > 0) {
                this.sidebar.setLine(LineType.Poison, { Right: `${this.turns.value} ${this.turns.value == 1 ? "turn" : "turns"}`, BarPercent: ((this.turns.value / this.turns.max) * 100) });
            } else {
                this.sidebar.removeLine(LineType.Poison);
            }
        }
        return false;
    }
}