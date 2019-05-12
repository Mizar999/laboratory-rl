import { Display, Scheduler, RNG } from "rot-js/lib/index";
import { DisplayOptions } from "rot-js/lib/display/types";
import Simple from "rot-js/lib/scheduler/simple";

import { MessageLog } from "./ui/messsage-log";
import { Sidebar, LineType } from "./ui/sidebar";
import { Visual } from "./ui/visual";
import { Map } from "./ui/map/map";
import { Player, PlayerStat } from "./actor/player";
import { InputUtility } from "./util/input-utility";
import { Point } from "./util/point";
import { ServiceLocator } from "./service-locator";
import { Actor } from "./actor/actor";

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
        this.player.strength = new PlayerStat(strength, 1)
        this.player.speed = new PlayerStat(speed, 1)
        this.player.mind = new PlayerStat(mind)
        this.player.maxBoost = 1;
        this.addActor(this.player);
    }

    private async mainLoop(): Promise<any> {
        let actor: Actor;
        while (true) {
            actor = this.scheduler.next();
            if (!actor) {
                break;
            }

            await actor.takeTurn();
            this.drawPanel();
        }
    }

    private drawPanel(): void {
        this.display.clear();
        this.map.draw();
        this.drawSidebar();
    }

    private drawSidebar(): void {
        this.sidebar.setLine(LineType.HeaderPlayer, { Left: "@: Player" });
        this.sidebar.setLine(LineType.Strength, {
            Left: "Strength",
            Right: this.player.strength.toString(),
            BarPercent: this.player.strength.toPercent(),
            BarColor: "crimson"
        });
        this.sidebar.setLine(LineType.Speed, {
            Left: "Speed",
            Right: this.player.speed.toString(),
            BarPercent: this.player.speed.toPercent(),
            BarColor: "limegreen"
        });
        this.sidebar.setLine(LineType.Mind, {
            Left: "Mind",
            Right: this.player.mind.toString(),
            BarPercent: this.player.mind.toPercent(),
            BarColor: "cornflowerblue"
        });
        this.sidebar.setLine(LineType.HeaderEffects, { Left: "Effects" });
    }
}