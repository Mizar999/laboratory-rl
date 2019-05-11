import { Display } from "rot-js/lib/index";
import { DisplayOptions } from "rot-js/lib/display/types";

import { MessageLog } from "./ui/messsage-log";
import { Sidebar, LineType } from "./ui/sidebar";
import { InputUtility } from "./util/input-utility";

export class Game {
    private display: Display
    private displayOptions: Partial<DisplayOptions>;
    private turns = { max: 80, value: 80 };

    constructor() {
        this.displayOptions = {
            width: 50,
            height: 20,
            fontSize: 20,
            spacing: 1.1
        };
        this.display = new Display(this.displayOptions);
        document.getElementById("display").appendChild(this.display.getContainer());

        this.debug();
    }

    private debug(): Promise<any> {
        Sidebar.setLine(LineType.HeaderPlayer, { Left: "@: Player" });
        Sidebar.setLine(LineType.Strength, { Left: "Strength", Right: "11 / 11", BarPercent: 100, BarColor: "crimson" });
        Sidebar.setLine(LineType.Speed, { Left: "Speed", Right: "10 / 10", BarPercent: 100, BarColor: "limegreen" });
        Sidebar.setLine(LineType.Mind, { Left: "Mind", Right: "7 / 7", BarPercent: 100, BarColor: "cornflowerblue" });
        Sidebar.setLine(LineType.HeaderEffects, { Left: "Effects" });
        Sidebar.setLine(LineType.Poison, { Left: "Poison", Right: `${this.turns.value} turn(s)`, BarPercent: ((this.turns.value / this.turns.max) * 100), BarColor: "slategray" });

        MessageLog.addMessages("&nbsp;", "&nbsp;", "&nbsp;", "Press some keys ...");

        return InputUtility.waitForInput(this.handleInput.bind(this));
    }

    private handleInput(event: KeyboardEvent): boolean {
        MessageLog.addMessages(`Key '${event.code}' was pressed`);
        if (this.turns.value > 0) {
            --this.turns.value;
            if (this.turns.value > 0) {
                Sidebar.setLine(LineType.Poison, { Right: `${this.turns.value} turn(s)`, BarPercent: ((this.turns.value / this.turns.max) * 100) });
            } else {
                Sidebar.removeLine(LineType.Poison);
            }
        }
        return false;
    }
}