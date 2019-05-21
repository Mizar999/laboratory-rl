import { Creature } from "./creature";
import { Visual } from "../ui/visual";
import { Point } from "../util/point";
import { AI } from "../ai/ai";
import { BreedItem } from "../item/breed-item";
import { Range } from "../combat/range";
import { TextConstants } from "../util/text-constants";

export class Breed {
    private static readonly MissingVisual = new Visual('@', "red", "white");
    private static readonly MissingAI = new AI();

    name: string;
    visual: Visual;
    difficulty: number;
    maxHealth: number;
    ai: AI;
    items: BreedItem[];

    constructor(params: any = {}) {
        let parent: any = {};
        if (params.parent) {
            parent = params.parent;
        }

        this.name = params.name || parent.name || TextConstants.MissingName;
        this.visual = params.visual || parent.visual || Breed.MissingVisual;
        this.difficulty = params.difficulty || parent.difficulty || 0;
        this.maxHealth = params.maxHealth || parent.maxHealth || Math.max(this.difficulty * 3, 0);
        this.ai = params.ai || parent.ai || Breed.MissingAI;
        this.items = params.items || parent.items || [];
    }

    newCreature(position: Point): Creature {
        return new Creature(position, this);
    }

    getAttackItems(rangeFilter: Range = undefined): ReadonlyArray<BreedItem> {
        return this.items.reduce<BreedItem[]>((items, breedItem) => {
            let attack = breedItem.getItem().getAttack();
            if (attack) {
                if (!rangeFilter || attack.getRange() === rangeFilter) {
                    items.push(breedItem);
                }
            }
            return items;
        }, []);
    }

    getDefenseItems(): ReadonlyArray<BreedItem> {
        return this.items.reduce<BreedItem[]>((items, breedItem) => {
            if (breedItem.getItem().getDefense()) {
                items.push(breedItem);
            }
            return items;
        }, []);
    }

    getUsableItems(): ReadonlyArray<BreedItem> {
        return this.items.reduce<BreedItem[]>((items, breedItem) => {
            if (breedItem.getItem().getUse()) {
                items.push(breedItem);
            }
            return items;
        }, []);
    }
}