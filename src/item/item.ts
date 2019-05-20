import { Attack } from "../combat/attack";
import { Use } from "./use";

export class Item {
    melee: Attack;
    shortRange: Attack;
    longRange: Attack;
    use: Use;
}