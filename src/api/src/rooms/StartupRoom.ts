import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { getPlayerSession } from "../instances";
import { EgyptianRoom } from "./EgyptianRoom";
import { OfficeRoom } from "./OfficeRoom";
import { AztecRoom } from "./AztecRoom";

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
            const room: ColdwarRoom = new ColdwarRoom();

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