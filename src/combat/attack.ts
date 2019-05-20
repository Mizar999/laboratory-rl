export enum AttackFlag {
    Light = "light",
    Middle = "middle",
    Heavy = "heavy",
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

// TODO maybe add range?
export class Attack {
    public static readonly Unarmed = new Attack(2, [AttackFlag.Light, AttackFlag.Strength, AttackFlag.Bash]);

    private flags: Set<AttackFlag>;

    constructor(private damage: number, flags: AttackFlag[] = []) {
        this.flags = new Set<AttackFlag>(flags);
    }

    getDamage(): number {
        return this.damage;
    }

    // TODO define die result
    getDiceModifier(dieResult: number): number {
        let modifier = Math.max(Math.min(dieResult, 20) - 16, 0);
        if (this.flags.has(AttackFlag.Pierce)) {
            if (dieResult >= 17) {
                modifier += 1;
            } else if (dieResult <= 5) {
                modifier -= 1;
            }
        }
        return modifier;
    }

    // TODO define defense
    getDefenseModifier(defense: number): number {
        return 0;
    }

    // TODO function getCalculatedDamage

    getFlags(): Set<AttackFlag> {
        return this.flags;
    }
}