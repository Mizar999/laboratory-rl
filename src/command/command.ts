import { Game } from "../game";

export class Command {
    execute(game: Game): Promise<CommandResult> {
        return this.success();
    }

    success(): Promise<CommandResult> {
        return Promise.resolve(new CommandResult(true));
    }

    fail(reason?: string): Promise<CommandResult> {
        return Promise.resolve(new CommandResult(false, reason));
    }

    alternate(game: Game, command: Command): Promise<CommandResult> {
        return command.execute(game);
    }
}

export class CommandResult {
    constructor(public readonly success: boolean, public readonly message?: string) { }
}