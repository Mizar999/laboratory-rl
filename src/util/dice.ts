import { RNG } from "rot-js/lib/index";

export class DiceResult {
    constructor(public readonly result: number, public readonly sides: number, public readonly modifier: number, public readonly dice: ReadonlyArray<number>) { }
}

export class Dice {
    static expressionRegEx = /\s*(\d+)d(\d+)([+\-]\d+)?\s*/i;

    static rollDie(sides: number, modifier: number = 0): DiceResult {
        let die = RNG.getUniformInt(1, Math.max(sides, 1));
        return new DiceResult(die + modifier, sides, modifier, [die]);
    }

    static rollD20(modifier: number = 0): DiceResult {
        return Dice.rollDie(20, modifier);
    }

    static rollDice(numberOf: number, sides: number, modifier: number = 0): DiceResult {
        sides = Math.max(sides, 1);
        let sum = 0;
        let dice: number[] = [];
        while (numberOf > 0) {
            dice.push(RNG.getUniformInt(1, sides));
            sum += dice[dice.length - 1];
            --numberOf;
        }
        return new DiceResult(sum + modifier, sides, modifier, dice);
    }

    static rollExpression(diceExpression: string): DiceResult {
        let match = diceExpression.match(Dice.expressionRegEx);
        if (match && match.length > 2) {
            let numberOf = parseInt(match[1]);
            let sides = parseInt(match[2]);
            let modifier = 0;
            if (match.length > 3) {
                let parsed = parseInt(match[3]);
                if (!isNaN(parsed)) {
                    modifier = parsed;
                }
            }
            return Dice.rollDice(numberOf, sides, modifier);
        }
        return;
    }
}