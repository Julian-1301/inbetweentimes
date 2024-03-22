import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Room } from "../../base/gameObjects/Room";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { PickupAction } from "../actions/PickupAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { ComputerItem } from "../interactables/ComputerItem";
import { PlayerSession } from "../../types";
import { SolveAction } from "../actions/SolveAction";
import { WatchItem } from "../interactables/WatchItem";
import { PhoneItem } from "../interactables/PhoneItem";
import { PlantItem } from "../items/PlantItem";

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

    public sounds(): string[] {
        return["Officeambient"];
    }

    public actions(): Action[] {
        return [new ExamineAction(),  
            new PickupAction(), 
            new SolveAction()];
        }

    public objects(): GameObject[] {        
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [...getGameObjectsFromInventory()];
        objects.push(new ComputerItem());
        objects.push(new PhoneItem());
        
        if (!playerSession.pickedUpWatch) {
            objects.push(new WatchItem());
        }
        
        if (!playerSession.pickedUpPlant) {
            objects.push(new PlantItem());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You are in your office.","Your computer is on and your travelwatch is on your desk", "Your day has been quiet but now your phone starts ringing", "You should pick up the phone, It might be your boss"]);
    }
}