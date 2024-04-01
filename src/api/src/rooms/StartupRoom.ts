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
        return " ";
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
        ];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "Start Game") {
            const room: OfficeRoom = new OfficeRoom();

            getPlayerSession().currentRoom = room.alias;
            return new TextActionResult(["You are in your <blue>Office</blue>.","Your <blue>Computer</blue> is on and your <blue>Travel-Watch</blue> is on your desk", "Your day has been quiet but now your <blue>Phone</blue> starts ringing", "You should pick up the <blue>Phone</blue>, It might be your <blue>Boss</blue>"]);
        }

        return undefined;
    }
}
