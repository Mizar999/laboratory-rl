import { Attack } from "../combat/attack";
import { Defense } from "../combat/defense";
import { Use } from "./use";

export class Item {
    attack: Attack;
    defense: Defense;
    use: Use;
}