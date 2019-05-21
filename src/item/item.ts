import {Attack} from "../combat/attack";
import {Defense} from "../combat/defense";
import { Use } from "./use";
import { TextConstants } from "../util/text-constants";

export class Item {
    private name: string;
    private attack: Attack;
    private defense: Defense;
    private use: Use;

    constructor(params: any = {}) {
        this.name = params.name || TextConstants.MissingName;
        this.attack = params.attack;
        this.defense = params.defense;
        this.use = params.use;
    }

    getAttack(): Attack {
        return this.attack;
    }

    getDefense(): Defense {
        return this.defense;
    }

    getUse(): Use {
        return this.use;
    }

    describe(): string {
        return this.name;
    }
}