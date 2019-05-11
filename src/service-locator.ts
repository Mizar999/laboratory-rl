import { InputUtility } from "./util/input-utility";
import { MessageLog } from "./ui/messsage-log";
import { Sidebar } from "./ui/sidebar";

export class ServiceLocator {
    private static inputUtility: InputUtility;
    private static messageLog: MessageLog;
    private static sidebar: Sidebar;

    static getInputUtility(): InputUtility {
        return ServiceLocator.inputUtility;
    }

    static provideInputUtility(inputUtility: InputUtility): void {
        ServiceLocator.inputUtility = inputUtility;
    }

    static getMessageLog(): MessageLog {
        return ServiceLocator.messageLog;
    }

    static provideMessageLog(messageLog: MessageLog): void {
        ServiceLocator.messageLog = messageLog;
    }

    static getSidebar(): Sidebar {
        return ServiceLocator.sidebar;
    }

    static provideSidebar(sidebar: Sidebar): void {
        ServiceLocator.sidebar = sidebar;
    }
}