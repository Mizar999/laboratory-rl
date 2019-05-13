import { Display, Scheduler, RNG } from "rot-js/lib/index";
import { DisplayOptions } from "rot-js/lib/display/types";
import Simple from "rot-js/lib/scheduler/simple";

import { MessageLog } from "./ui/messsage-log";
import { Sidebar, LineType } from "./ui/sidebar";
import { Visual } from "./ui/visual";
import { Map } from "./ui/map/map";
import { Player } from "./actor/player";
import { StatType, PlayerStat } from "./actor/player-stats";
import { InputUtility } from "./util/input-utility";
import { Point } from "./util/point";
import { ServiceLocator } from "./service-locator";
import { Actor } from "./actor/actor";
import { Command, CommandResult, CommandResultType } from "./command/command";

export class Game {
    private display: Display
    private displayOptions: Partial<DisplayOptions>;
    private messageLog: MessageLog;
    private sidebar: Sidebar;
    private map: Map;
    private player: Player;
    private actors: Actor[];
    private scheduler: Simple;

    constructor() {
        this.initialize();
        this.initializeLevel();
        this.mainLoop();
    }

    draw(position: Point, visual: Visual): void {
        this.display.draw(position.x, position.y, visual.char, visual.color, visual.background);
    }

    getMessageLog(): MessageLog {
        return this.messageLog;
    }

    getSidebar(): Sidebar {
        return this.sidebar;
    }

    getMap(): Map {
        return this.map;
    }

    getActors(): ReadonlyArray<Actor> {
        return this.actors;
    }

    addActor(actor: Actor): void {
        this.actors.push(actor);
    }

    removeActor(actor: Actor): void {
        let index = this.actors.indexOf(actor);
        if (index >= 0) {
            this.actors.splice(index, 1);
        }
    }

    private initialize(): void {
        ServiceLocator.provideInputUtility(new InputUtility());

        this.displayOptions = {
            width: 50,
            height: 20,
            fontSize: 21,
            spacing: 1.1
        };
        this.display = new Display(this.displayOptions);
        document.getElementById("display").appendChild(this.display.getContainer());

        this.sidebar = new Sidebar(document.getElementById("sidebar"));

        let maxMessages = 4;
        this.messageLog = new MessageLog(document.getElementById("messages"), maxMessages);
        this.messageLog.addMessages(...Array(maxMessages).fill("&nbsp;"));

        this.actors = [];
        this.map = new Map(this);
    }

    private initializeLevel(): void {
        this.initializeSidebar();

        this.map.generateMap(this.displayOptions.width, this.displayOptions.height);
        let positions = this.map.getRandomPassablePositions();
        this.createPlayer(positions[0]);

        this.scheduler = new Scheduler.Simple();
        for (let actor of this.getActors()) {
            this.scheduler.add(actor, true);
        }

        this.drawPanel();
    }

    private createPlayer(position: Point): void {
        this.player = new Player(position);
        let strength = 11;
        let speed = 10;
        let mind = 7;
        for (let counter = 0; counter < 6; ++counter) {
            switch (RNG.getUniformInt(0, 2)) {
                case 0:
                    ++strength;
                    break;
                case 1:
                    ++speed;
                    break;
                case 2:
                    ++mind;
                    break;
            }
        }
        let stats = this.player.getStats();
        stats.initializeStat(StatType.Strength, strength, 1);
        stats.initializeStat(StatType.Speed, speed, 1);
        stats.initializeStat(StatType.Mind, mind);

        stats.subscribeStatChanged(this.handlePlayerStatsChanged.bind(this));

        this.addActor(this.player);
    }

    private async mainLoop(): Promise<any> {
        let actor: Actor;
        let command: Command;
        let commandResult: CommandResult;
        while (true) {
            if (!commandResult || commandResult.result != CommandResultType.Wait) {
                actor = this.scheduler.next();
                if (!actor) {
                    break;
                }
            }

            command = await actor.takeTurn();
            commandResult = await command.execute(this);
            if (commandResult.result != CommandResultType.Success && commandResult.message) {
                this.messageLog.addMessages(commandResult.message);
            }

            this.drawPanel();
        }
    }

    private drawPanel(): void {
        this.display.clear();
        this.map.draw();
    }

    private initializeSidebar(): void {
        if (this.player) {
            this.player.getStats().unsubscribeStatChanged(this.handlePlayerStatsChanged.bind(this));
        }

        this.sidebar.setLine(LineType.HeaderPlayer, { Left: "@: Player" });
        this.sidebar.setLine(LineType.Strength, { Left: "Strength", BarPercent: 100, BarColor: "crimson", Right: "" });
        this.sidebar.setLine(LineType.Speed, { Left: "Speed", BarPercent: 0, BarColor: "limegreen", Right: "" });
        this.sidebar.setLine(LineType.Mind, { Left: "Mind", BarPercent: 0, BarColor: "cornflowerblue", Right: "" });
        this.sidebar.setLine(LineType.HeaderEffects, { Left: "Effects" });
    }

    private handlePlayerStatsChanged(stat: StatType, newValues: PlayerStat): void {
        let lineType = LineType.Strength;
        switch (stat) {
            case StatType.Speed:
                lineType = LineType.Speed;
                break;
            case StatType.Mind:
                lineType = LineType.Mind;
                break;
        }
        this.sidebar.setLine(lineType, { BarPercent: newValues.toPercent(), Right: newValues.toString() });
    }
}