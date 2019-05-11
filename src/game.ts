import { Display } from "rot-js/lib/index";
import { DisplayOptions } from "rot-js/lib/display/types";

import { MessageLog } from "./ui/messsage-log";
import { Sidebar, LineType } from "./ui/sidebar";
import { InputUtility } from "./util/input-utility";
import { ServiceLocator } from "./service-locator";

export class Game {
    private display: Display
    private displayOptions: Partial<DisplayOptions>;
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

    private initialize(): void {
        ServiceLocator.provideInputUtility(new InputUtility());
        ServiceLocator.provideMessageLog(new MessageLog(document.getElementById("messages"), 4));
        ServiceLocator.provideSidebar(new Sidebar(document.getElementById("sidebar")));
    }

    private debug(): Promise<any> {
        let sidebar = ServiceLocator.getSidebar();
        sidebar.setLine(LineType.HeaderPlayer, { Left: "@: Player" });
        sidebar.setLine(LineType.Strength, { Left: "Strength", Right: "11 / 11", BarPercent: 100, BarColor: "crimson" });
        sidebar.setLine(LineType.Speed, { Left: "Speed", Right: "10 / 10", BarPercent: 100, BarColor: "limegreen" });
        sidebar.setLine(LineType.Mind, { Left: "Mind", Right: "7 / 7", BarPercent: 100, BarColor: "cornflowerblue" });
        sidebar.setLine(LineType.HeaderEffects, { Left: "Effects" });
        sidebar.setLine(LineType.Poison, { Left: "Poison", Right: `${this.turns.value} turn(s)`, BarPercent: ((this.turns.value / this.turns.max) * 100), BarColor: "slategray" });

        ServiceLocator.getMessageLog().addMessages("&nbsp;", "&nbsp;", "&nbsp;", "Press some keys ...");

        return ServiceLocator.getInputUtility().waitForInput(this.handleInput.bind(this));
    }

    private handleInput(event: KeyboardEvent): boolean {
        ServiceLocator.getMessageLog().addMessages(`Key '${event.code}' was pressed`);

        if (this.turns.value > 0) {
            --this.turns.value;
            let sidebar = ServiceLocator.getSidebar();
            if (this.turns.value > 0) {
                sidebar.setLine(LineType.Poison, { Right: `${this.turns.value} turn(s)`, BarPercent: ((this.turns.value / this.turns.max) * 100) });
            } else {
                sidebar.removeLine(LineType.Poison);
            }
        }
        return false;
    }
}