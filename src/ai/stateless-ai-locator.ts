import { AI } from "./ai";
import { MeleeAI } from "./melee-ai";

export class StatelessAILocator {
    private static ai: AI;
    private static meleeAi: MeleeAI;

    static getAI(): AI {
        return StatelessAILocator.ai;
    }

    static provideAI(ai: AI): void {
        StatelessAILocator.ai = ai;
    }

    static getMeleeAI(): MeleeAI {
        return StatelessAILocator.meleeAi;
    }

    static provideMeleeAI(meleeAi: MeleeAI): void {
        StatelessAILocator.meleeAi = meleeAi;
    }
}