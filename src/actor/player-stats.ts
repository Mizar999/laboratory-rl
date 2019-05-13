export enum StatType {
    Strength = "strength",
    Speed = "speed",
    Mind = "mind"
}

export enum ValueType {
    MaxBoost = "maxBoost",
    Rank = "rank"
}

export const enum HealthType {
    Healthy = 3,
    Damaged = 2,
    Weak = 1,
    Dead = 0
}

export class PlayerStats {
    private strength: PlayerStat;
    private speed: PlayerStat;
    private mind: PlayerStat;
    private maxBoost: number;
    private rank: number;
    private health: HealthType;

    private statChangedListeners: ((stat: StatType, newValues: PlayerStat) => void)[];
    private valueChangedListeners: ((value: ValueType, newValue: number) => void)[];
    private healthChangedListeners: ((newValue: HealthType) => void)[];

    constructor() {
        this.strength = new PlayerStat(1);
        this.speed = new PlayerStat(1);
        this.mind = new PlayerStat(1);

        this.maxBoost = this.rank = 0;

        // TODO calculate health
        this.health = HealthType.Healthy;

        this.statChangedListeners = [];
        this.valueChangedListeners = [];
        this.healthChangedListeners = [];
    }
    
    getStat(stat: StatType): PlayerStat {
        let playerStat = new PlayerStat(this[stat].max, this[stat].save);
        playerStat.value = this[stat].value;
        return playerStat;
    }

    initializeStat(stat: StatType, max: number, save: number = 0): void {
        this[stat].max = Math.max(max, 0);
        this[stat].save = Math.max(save, 0);
        this[stat].value = this[stat].max;
        this.handleStatChanged(stat);
    }

    changeStatValue(stat: StatType, diff: number): void {
        // TODO cascade stat change to other stats
        this[stat].value = Math.max(Math.min(this[stat].value + diff, this[stat].max), 0);
        this.handleStatChanged(stat);
    }

    setStatMax(stat: StatType, max: number): void {
        this[stat].max = Math.max(max, 0);
        this.handleStatChanged(stat);
    }

    setStatSave(stat: StatType, save: number): void {
        this[stat].save = Math.max(save, 0);
        this.handleStatChanged(stat);
    }

    getValue(type: ValueType): number {
        return this[type];
    }

    changeValue(type: ValueType, diff: number): void {
        this[type] = this[type] + diff;
        this.handleValueChanged(type);
    }

    setValue(type: ValueType, value: number): void {
        this[type] = value;
        this.handleValueChanged(type);
    }

    getHealth(): HealthType {
        return this.health;
    }

    changeHealth(diff: number): void {
        let value = this.health;
        this.health = Math.max(Math.min(value + diff, HealthType.Healthy), HealthType.Dead);
        this.handleHealthChanged(this.health);
    }

    subscribeHealthChanged(callback: (newValue: HealthType) => void): void {
        this.healthChangedListeners.push(callback);
    }

    unsubscribeHealthChanged(callback: (newValue: HealthType) => void): void {
        let index = this.healthChangedListeners.indexOf(callback);
        if (index >= 0) {
            this.healthChangedListeners.splice(index, 1);
        }
    }

    subscribeValueChanged(callback: (type: ValueType, newValue: number) => void): void {
        this.valueChangedListeners.push(callback);
    }

    unsubscribeValueChanged(callback: (type: ValueType, newValue: number) => void): void {
        let index = this.valueChangedListeners.indexOf(callback);
        if (index >= 0) {
            this.valueChangedListeners.splice(index, 1);
        }
    }

    subscribeStatChanged(callback: (stat: StatType, newValue: PlayerStat) => void): void {
        this.statChangedListeners.push(callback);
    }

    unsubscribeStatChanged(callback: (stat: StatType, newValue: PlayerStat) => void): void {
        let index = this.statChangedListeners.indexOf(callback);
        if (index >= 0) {
            this.statChangedListeners.splice(index, 1);
        }
    }
    
    private handleStatChanged(stat: StatType): void {
        for (let listener of this.statChangedListeners) {
            listener(stat, this.getStat(stat));
        }
    }

    private handleValueChanged(value: ValueType): void {
        for (let listener of this.valueChangedListeners) {
            listener(value, this[value]);
        }
    }

    private handleHealthChanged(newValue: HealthType): void {
        for (let listener of this.healthChangedListeners) {
            listener(newValue);
        }
    }
}

export class PlayerStat {
    value: number;

    constructor(public max: number, public save: number = 0) {
        this.value = max;
    }

    toPercent(): number {
        if (this.max == 0) {
            return 0;
        }
        return (this.value / this.max) * 100;
    }

    toString(): string {
        return `${this.value} / ${this.max} (${this.save})`;
    }
}