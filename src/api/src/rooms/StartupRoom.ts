import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { EgyptianRoom } from "../julian/rooms/EgyptianRoom";
import { OfficeRoom } from "../julian/rooms/OfficeRoom";
<<<<<<< HEAD
<<<<<<< HEAD
import { AztecRoom } from "../nicolai/rooms/AztecRoom";
=======
import { AztecRoom } from "./AztecRoom";
import { ColdWarRoom } from "./ColdWarRoom";
>>>>>>> ba8603002efbf53af058e49986e4e5282be5b459
=======
import { AztecRoom } from "../nicolai/rooms/AztecRoom";
>>>>>>> 8cdb44b195d6aceeded5c94e6503a7c7597dd789

export const StartupRoomAlias: string = "startup";

export class StartupRoom extends Room {
    public constructor() {
        super(StartupRoomAlias);
    }

    public name(): string {
        return "Example Game";
    }

    public images(): string[] {
        return ["startup"];
    }

    public actions(): Action[] {
        return [new CustomAction("goto-officeroom", "Go to Office", false), 
        new CustomAction("goto-egyptianroom", "Go to Egyptian Room", false), 
        new CustomAction("goto-coldwarroom", "Go to Cold War Room", false), 
        new CustomAction("goto-aztecroom", "Go to Aztec Room", false)];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is an example."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "goto-egyptianroom") {
            const room: EgyptianRoom = new EgyptianRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "goto-officeroom") {
            const room: OfficeRoom = new OfficeRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "goto-coldwarroom") {
            const room: ColdWarRoom = new ColdWarRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "goto-aztecroom") {
            const room: AztecRoom = new AztecRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }

        return undefined;
    }
}