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
import { PhoneItem } from "../interactables/PhoneItem";
import { PlantItem } from "../interactables/PlantItem";
import { LighterItem } from "../interactables/LighterItem";
import { AnubisStatueCharacter } from "../characters/AnubisStatueCharacter";
import { TalkAction } from "../../base/actions/TalkAction";

export const OfficeRoomAlias: string = "Office";

export class OfficeRoom extends Room {
    public constructor() {
        super(OfficeRoomAlias);
    }

    public name(): string {
        return "Office";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        const images: any = [];

        images.push("OfficeRoom");

        if (playerSession.riddleValue === 3) {
            images.push("StatueEgypt");
        }

        return images;
    }

    public sounds(): string[] {
        return["Officeambient"];
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();
        const officeActions: any[] = [
            new ExamineAction(), 
            new TalkAction(),
            new PickupAction(), 
            new SolveAction()
        ];

        if (playerSession.riddleValue !== 3) {
            officeActions.splice(1, 1);
        }

        if (playerSession.callNumber === 0) {
            officeActions.splice(0, 2);
        }
        
        return officeActions;
    }

    public objects(): GameObject[] {        
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [...getGameObjectsFromInventory()];
        objects.push(new ComputerItem());
        objects.push(new PhoneItem());

        
        if (!playerSession.pickedUpPlant) {
            objects.push(new PlantItem());
        }
        if (!playerSession.pickedUpLighter) {
            objects.push(new LighterItem());
        }
        if (playerSession.riddleValue === 3) {
            objects.push(new AnubisStatueCharacter());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You enter <blue>The Office</blue>"]);
    }
}