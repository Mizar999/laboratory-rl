import { Actor } from "./actor";
import { Creature } from "./creature";
import { Game } from "../game";
import { Visual } from "../ui/visual";
import { Point } from "../util/point";
import { AI } from "../ai/ai";

export class Breed {
    private static readonly MissingName = "missing name";
    private static readonly MissingVisual = new Visual('@', "red", "white");
    private static readonly MissingAI = new AI();

    name: string;
    visual: Visual;
    difficulty: number;
    maxHealth: number;
    attacks: { difficulty: number, damage: number }[]; // TODO define attacks
    defenses: { difficulty: number }[]; // TODO define defenses
    armor: number; // TODO define armor
    moves: ((game: Game, source: Actor) => void)[]; // TODO define moves
    items: ((game: Game, source: Actor) => void)[]; // TODO define items
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
        this.attacks = params.attacks || parent.attacks || [{ difficulty: this.difficulty, damage: this.difficulty }];
        this.defenses = params.defenses || parent.defenses || [{ difficulty: this.difficulty }];
        this.armor = params.armor || parent.armor || 0;
        this.moves = params.moves || parent.moves || [];
        this.items = params.items || parent.items || [];
        this.ai = params.ai || parent.ai || Breed.MissingAI;
    }

    newCreature(position: Point): Creature {
        return new Creature(position, this);
    }
}