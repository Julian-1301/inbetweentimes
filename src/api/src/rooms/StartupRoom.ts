import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
// import { ColdWarRoom } from "../fabian/rooms/ColdWarRoom";
import { getPlayerSession } from "../instances";
// import { EgyptianRoom } from "../julian/rooms/EgyptianRoom";
import { OfficeRoom } from "../julian/rooms/OfficeRoom";
// import { AztecRoom } from "../nicolai/rooms/AztecRoom";

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "";
    }

    public images(): string[] {
        return ["Logo"];
    }

    public sounds(): string[] {
        return ["StartScreen"];
    }

    public actions(): Action[] {
        return [
            new CustomAction("Start Game", "Start Game", false),
            new CustomAction("Load Game", "Load Game", false),
            new CustomAction("Settings", "Settings", false),
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "Load Game") {
            return new TextActionResult(["Not implemented yet"]);
        } else if (alias === "Start Game") {
            const room: OfficeRoom = new OfficeRoom();

            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "Settings") {
            return new TextActionResult(["Not implemented yet"]);
        }

        return undefined;
    }
}
