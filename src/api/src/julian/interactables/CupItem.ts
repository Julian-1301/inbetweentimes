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
            return new TextActionResult(["The cup is empty","Maybe you can use this for something"]);
        } else {
            return new TextActionResult(["An empty cup lays on the ground", "It is covered in cobwebs but you should be able to grab it"]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpCup) {
            playerSession.pickedUpCup = true;
            playerSession.inventory.push(CupItemAlias);

            return new TextActionResult(["You pick up the cup"]);
        }
        else
        
        return new TextActionResult(["You already picked up the Cup"]);
    }

    public solve(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
    
        if (playerSession.currentRoom === OasisRoomAlias) {
            playerSession.inventory.push(FilledCupItemAlias);
            playerSession.inventory = playerSession.inventory.filter(item => item !== CupItemAlias);
            playerSession.pickedUpFilledCup = true;
            return new TextActionResult(["You fill the cup with water from the oasis"]);
        } else {
            return undefined;
        }
    }
}