import { Category } from "./category";
import { AttackType } from "./attack";

export class Defense {
    private types: Set<AttackType>;

    constructor(private category: Category, private armor: number, types: AttackType[] = [AttackType.Strength]) {
        this.types = new Set(types);
    }

    getCategory(): Category {
        return this.category;
    }

    getArmor(): number {
        return this.armor;
    }

    getTypes(): Set<AttackType> {
        return this.types;
    }
}