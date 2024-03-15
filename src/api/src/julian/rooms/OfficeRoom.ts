import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Room } from "../../base/gameObjects/Room";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { PickupAction } from "../../base/actions/PickupAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { EgyptianRoom } from "./EgyptianRoom";
import { ColdWarRoom } from "../../fabian/rooms/ColdWarRoom";
import { ComputerItem } from "../items/ComputerItem";
import { AztecRoom } from "../../nicolai/rooms/AztecRoom";

export const OfficeRoomAlias: string = "Office";

export class OfficeRoom extends Room {
    public constructor() {
        super(OfficeRoomAlias);
    }

    public name(): string {
        return "Office";
    }

    public images(): string[] {
        return ["OfficeRoom"];
    }

    public actions(): Action[] {
        return [new ExamineAction(),  
            new PickupAction(), 
            new CustomAction("goto-egyptroom", "Go to Egyptian Room", false),
            new CustomAction("goto-coldwarroom", "Go to Cold War Room", false),
            new CustomAction("goto-aztecroom", "Go to Aztec Room", false)];
    }

    public objects(): GameObject[] {        
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
        objects.push(new ComputerItem);
        console.log(objects);
        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is your office room.","You have spent a lot of time here."]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "goto-egyptroom") {
            const room: EgyptianRoom = new EgyptianRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "goto-coldwarroom") {
            const room: ColdWarRoom = new ColdWarRoom();
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        } else if (alias === "goto-aztecroom") {
            const room: AztecRoom = new AztecRoom();
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        
        return undefined;
    }
}
}