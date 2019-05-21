import { Range } from "./range";
import { Category } from "./category";
import { Actor } from "../actor/actor";

export enum AttackType {
    Strength = "strength",
    Speed = "speed",
    Mind = "mind",
    Slash = "slash",
    Pierce = "pierce",
    Bash = "bash",
    Fire = "fire",
    Ice = "ice",
    Electric = "electric",
    Poison = "poison"
}

export class Attack {
    public static readonly Unarmed = new Attack(Category.Light, Range.Melee, 2, [AttackType.Strength, AttackType.Bash]);

    private types: Set<AttackType>;

    constructor(private category: Category, private range: Range, private damage: number, types: AttackType[] = []) {
        if (types.length == 0) {
            switch (this.range) {
                case Range.Melee:
                    types.push(AttackType.Strength);
                    break;
                default:
                    types.push(AttackType.Speed);
                    break;
            }
        }
        this.types = new Set<AttackType>(types);
    }

    getCategory(): Category {
        return this.category;
    }

    getRange(): Range {
        return this.range;
    }

    getDamage(): number {
        return this.damage;
    }

    // TODO: define die result
    getDiceModifier(dieResult: number): number {
        let modifier = Math.max(Math.min(dieResult, 20) - 16, 0);
        if (this.types.has(AttackType.Pierce)) {
            if (dieResult >= 17) {
                modifier += 1;
            } else if (dieResult <= 5) {
                modifier -= 1;
            }
        }
        return modifier;
    }

    getDefenseModifier(target: Actor): number {
        let modifier = 0;
        if (this.types.has(AttackType.Slash)) {
            if (target.wearsArmor()) {
                modifier -= 1;
            } else {
                modifier += 1;
            }
        }
        if (this.types.has(AttackType.Bash)) {
            if (target.wearsArmor()) {
                modifier += 1;
            } else {
                modifier -= 1;
            }
        }
        return modifier;
    }

    // TODO: function getCalculatedDamage

    getTypes(): Set<AttackType> {
        return this.types;
    }
}