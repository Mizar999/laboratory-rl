export class Point {
    constructor(public x: number, public y: number) { }

    toKey(): string {
        return this.x + "," + this.y;
    }

    fromKey(key: string): Point {
        let parts = key.split(",");
        return new Point(parseInt(parts[0]), parseInt(parts[1]));
    }
}