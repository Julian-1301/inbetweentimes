import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { OasisRoomAlias } from "../rooms/OasisRoom";
import { EgyptianRoomAlias } from "../rooms/EgyptianRoom";
import { SolveChoiceAction } from "../actions/SolveAction";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { CupItemAlias } from "./CupItem";

export const FilledCupItemAlias: string = "filledcup";

export class FilledCupItem extends Interactable implements Examine, Pickup {

    public constructor() {
        super(FilledCupItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Filled Cup";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The <blue>Cup</blue> is filled to the brim","You should not drink the water", "It might be useful for something"]);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
    
        switch(choiceId) {
            case 1:
                playerSession.drygroundValue++;
                playerSession.inventory = playerSession.inventory.filter(item => item !== FilledCupItemAlias);
                return new TextActionResult(["You water your <blue>Plant</blue>", "It looks way better here than it ever did in your <blue>Office</blue>", "A few flowers starts growing from it", "You won't need this <blue>Cup</blue> anymore so you decide to throw it away"]);
            case 2:
                playerSession.inventory = playerSession.inventory.filter(item => item !== FilledCupItemAlias);
                playerSession.inventory.push(CupItemAlias);
                return new TextActionResult(["Hey, What is wrong with you", "I am completely soaked now", "I hate you"]);
            case 3:
                return new TextActionResult(["You decide to keep your <blue>Cup</blue> for now"]);
            case 4:
                return new TextActionResult(["There is no reason to waste your water on this now", "Maybe you need to do something else first"]);
        }
        if (playerSession.currentRoom === OasisRoomAlias) {
            return new TextActionResult(["You already filled the <blue>Cup</blue> to the brim"]);
        } 
        
        if (playerSession.currentRoom === EgyptianRoomAlias && playerSession.drygroundValue === 1) {
            return new SolveActionResult(this, ["What do you want to use your water on?"], [
                new SolveChoiceAction(1, "Dry Plant"),
                new SolveChoiceAction(2, "Shady Figure"),
                new SolveChoiceAction(3, "Cancel")
            ]);
        } else if (playerSession.currentRoom === EgyptianRoomAlias && playerSession.drygroundValue === 0) {
            return new SolveActionResult(this, ["What do you want to use your water on?"], [
                new SolveChoiceAction(4, "Dry Ground"),
                new SolveChoiceAction(2, "Shady Figure"),
                new SolveChoiceAction(3, "Cancel")
            ]);
        } else {
            return undefined;
        }
    }

    public pickup(): ActionResult | undefined {
        return undefined;
    }
    
}