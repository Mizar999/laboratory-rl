export class Visual {
    public static readonly MissingVisual = new Visual('@', "red", "white");

    constructor(public char: string, public color?: string, public background?: string) { }
}