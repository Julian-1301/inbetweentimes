import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { OasisRoomAlias } from "../rooms/OasisRoom";

export const FilledCupItemAlias: string = "filledcup";

export class FilledCupItem extends Interactable implements Examine {

    public constructor() {
        super(FilledCupItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Filled Cup";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The cup is filled to the brim","You should not drink the water", "It might be useful for something"]);
    }

    public solve(_choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
    
        if (playerSession.currentRoom === OasisRoomAlias) {
            return new TextActionResult(["You already filled the cup to the brim"]);
        } else {
            return undefined;
        }
    }
    
}