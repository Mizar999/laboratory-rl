import { RNG } from "rot-js";

import { Creature } from "./creature";
import { Visual } from "../ui/visual";
import { Point } from "../util/point";
import { AI } from "../ai/ai";
import { Attack } from "../combat/attack";
import { Range } from "../combat/range";
import { BreedAttack } from "../combat/breed-attack";
import { BreedDefense } from "../combat/breed-defense";
import { Use } from "../item/use";

export class Breed {
    private static readonly MissingName = "missing name";
    private static readonly MissingVisual = new Visual('@', "red", "white");
    private static readonly MissingAI = new AI();

    name: string;
    visual: Visual;
    difficulty: number;
    maxHealth: number;
    attacks: BreedAttack[];
    defenses: BreedDefense[];
    moves: Use[];
    ai: AI;

    constructor(params?: any) {
        let parent: any = {};
        if (params.parent) {
            parent = params.parent;
        }

        this.name = params.name || parent.name || Breed.MissingName;
        this.visual = params.visual || parent.visual || Breed.MissingVisual;
        this.difficulty = params.difficulty || parent.difficulty || 0;
        this.maxHealth = params.maxHealth || parent.maxHealth || Math.max(this.difficulty * 3, 0);
        this.ai = params.ai || parent.ai || Breed.MissingAI;

        // TODO: let enemies wear items & equipment (includes natural equipment like claws)
        this.attacks = params.attacks || parent.attacks || new BreedAttack(Attack.Unarmed);
        this.defenses = params.defenses || parent.defenses || [];
        this.moves = params.moves || parent.moves || [];
    }

    newCreature(position: Point): Creature {
        return new Creature(position, this);
    }

    getRandomAttack(rangeFilter: Range = undefined): BreedAttack {
        let attacks: BreedAttack[];
        if (rangeFilter === undefined) {
            attacks = this.attacks;
        } else {
            attacks = this.attacks.filter(attack => attack.getAttack().getRange() === rangeFilter);
        }

        let sum = 0;
        let probabilities: number[] = [];
        for (let attack of attacks) {
            sum += Math.max(attack.getProbabilityWeight(), 0);
            probabilities.push(sum);
        }

        let result = RNG.getUniform() * sum;
        for (let index in probabilities) {
            if (result < probabilities[index]) {
                return attacks[index];
            }
        }
    }
}