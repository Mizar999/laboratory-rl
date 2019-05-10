export class MessageLog {
    private static node = document.getElementById("messages");
    private static maxMessages = 4;

    static addMessages(...messages: string[]): void {
        let element: any;
        for (let message of messages) {
            element = document.createElement("div");
            element.innerHTML = message;
            MessageLog.node.appendChild(element);
        }

        while (MessageLog.node.childNodes.length > MessageLog.maxMessages) {
            MessageLog.node.removeChild(MessageLog.node.childNodes[0]);
        }
    }

    static clear(): void {
        while (MessageLog.node.childNodes.length > 0) {
            MessageLog.node.removeChild(MessageLog.node.childNodes[0]);
        }
    }
}