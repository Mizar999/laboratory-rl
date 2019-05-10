import { Display } from "rot-js/lib/index";
import { DisplayOptions } from "rot-js/lib/display/types";

import { MessageLog } from "./ui/messsage-log";
import { InputUtility } from "./util/input-utility";

export class Game {
    private display: Display
    private displayOptions: Partial<DisplayOptions>;

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
        MessageLog.addMessages("Press some keys ...");
        return InputUtility.waitForInput(this.handleInput.bind(this));
    }
    
    private handleInput(event: KeyboardEvent): boolean {
        MessageLog.addMessages(`Key '${event.code}' was pressed`);
        return false;
    }
}