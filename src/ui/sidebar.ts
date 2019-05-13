export enum LineType {
    HeaderPlayer = "header-player",
    HeaderEffects = "header-effects",
    Strength = "value-strength",
    Speed = "value-speed",
    Mind = "value-mind",
    Poison = "effect-poison"
}

export interface SidebarLine {
    Left?: string,
    Right?: string,
    BarPercent?: number,
    BarColor?: string
}

export class Sidebar {
    private lineId = "sidebar-line-";

    constructor(private node: HTMLElement) { }

    setLine(id: string, line: SidebarLine): void {
        let lineElement = document.getElementById(this.getIdAttribute(id));
        if (!lineElement) {
            this.addLine(id, line);
        } else {
            this.updateLine(id, line);
        }
    }

    removeLine(id: string): void {
        let lineElement = document.getElementById(this.getIdAttribute(id));
        if (!lineElement) {
            return;
        }
        this.node.removeChild(lineElement);
    }

    private addLine(id: string, line: SidebarLine): void {
        let lineElement = document.createElement("div");
        lineElement.setAttribute("id", this.getIdAttribute(id));
        lineElement.setAttribute("class", "line");

        if (line.BarPercent || line.BarColor) {
            let element = document.createElement("div");
            element.setAttribute("class", "bar");
            element.setAttribute("style", this.getBarStyle(line.BarPercent, line.BarColor));
            lineElement.appendChild(element);
        }

        if (line.Left) {
            let element = document.createElement("div");
            element.setAttribute("class", "left");
            element.append(document.createTextNode(line.Left));
            lineElement.appendChild(element);
        }

        if (line.Right) {
            let element = document.createElement("div");
            element.setAttribute("class", "right");
            element.append(document.createTextNode(line.Right));
            lineElement.appendChild(element);
        }

        this.node.appendChild(lineElement);
    }

    private updateLine(id: string, line: SidebarLine): void {
        // TODO elements of the line must be initialized before update
        let lineElement = document.getElementById(this.getIdAttribute(id));

        if (line.BarPercent || line.BarColor) {
            let element = lineElement.getElementsByClassName("bar")[0];
            let style = element.getAttribute("style");

            if (!line.BarPercent) {
                line.BarPercent = parseFloat(style.match(/width:\s*([^%]+)%\s*;/i)[1]);
            }
            if (!line.BarColor) {
                line.BarColor = style.match(/background:\s*([^;]+)\s*;/i)[1];
            }

            element.setAttribute("style", this.getBarStyle(line.BarPercent, line.BarColor));
        }

        if (line.Left) {
            let element = lineElement.getElementsByClassName("left")[0];
            element.replaceChild(document.createTextNode(line.Left), element.childNodes[0]);
        }

        if (line.Right) {
            let element = lineElement.getElementsByClassName("right")[0];
            element.replaceChild(document.createTextNode(line.Right), element.childNodes[0]);
        }
    }

    private getIdAttribute(id: string): string {
        return `${this.lineId}${id}`;
    }

    private getBarStyle(barPercent: number, barColor?: string): string {
        let style = `width: ${barPercent}%;`;
        if (barColor) {
            style += `background: ${barColor};`;
        }
        return style;
    }
}