import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { OasisRoomAlias } from "../rooms/OasisRoom";
import { FilledCupItemAlias } from "./FilledCupItem";

export const CupItemAlias: string = "cup";

export class CupItem extends Interactable implements Examine, Pickup {

    public constructor() {
        super(CupItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Cup";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpCup) {
            return new TextActionResult(["The <blue>Cup</blue> is empty.","Maybe you can use this for something."]);
        } else {
            return new TextActionResult(["An empty <blue>Cup</blue> lays on the ground,", "It is covered in cobwebs but you should be able to grab it"]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpCup) {
            playerSession.pickedUpCup = true;
            playerSession.inventory.push(CupItemAlias);

            return new TextActionResult(["You pick up the <blue>Cup</blue>."]);
        }
        else
        
        return new TextActionResult(["You already picked up the <blue>Cup</blue>."]);
    }

    public solve(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
    
        if (playerSession.currentRoom === OasisRoomAlias) {
            playerSession.inventory.push(FilledCupItemAlias);
            playerSession.inventory = playerSession.inventory.filter(item => item !== CupItemAlias);
            playerSession.pickedUpFilledCup = true;
            return new TextActionResult(["You fill the <blue>Cup</blue> with water from <blue>The Oasis</blue>."]);
        } else {
            return undefined;
        }
    }
}