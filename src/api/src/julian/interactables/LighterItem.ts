import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { SolveChoiceAction } from "../actions/SolveAction";
import { PyramidRoomAlias } from "../rooms/PyramidRoom";

export const LighterItemAlias: string = "lighter";

export class LighterItem extends Interactable implements Examine, Pickup {
  
    public constructor() {
        super(LighterItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Lighter";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpLighter) {
            return new TextActionResult(["This is your old <blue>Lighter</blue>", "You used to smoke but gave it up years ago"]);
        } else {
            return new TextActionResult(["You see something metalic on your desk", "It is your old <blue>Lighter</blue>"]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpLighter) {
            playerSession.pickedUpLighter = true;
            playerSession.inventory.push(LighterItemAlias);

            return new TextActionResult(["You pick up the <blue>Lighter</blue>"]);
        }
        else {
            return new TextActionResult(["You already picked up the <blue>Lighter</blue>"]);
        } 
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const options: SolveChoiceAction[] = [new SolveChoiceAction(11, "Cancel")];
    
        for (let i: number = 0; i < 5; i++) {
            const torchIndex: number = i;
            if (playerSession.torchesLit[torchIndex] === 0) {
                options.push(new SolveChoiceAction(2 * torchIndex + 1, `Light ${torchIndex + 1}`));
            } else {
                options.push(new SolveChoiceAction(2 * torchIndex + 2, `Unlight ${torchIndex + 1}`));
            }
        }
    
        switch(choiceId) {
            case undefined:
                if (playerSession.currentRoom === PyramidRoomAlias) {
                    return new SolveActionResult(this, ["Do you want to interact with any of these <blue>Torches</blue>?"], options);
                } else {
                    return undefined;
                }
            case 11:
                return new TextActionResult(["You decide to leave the <blue>Torches alone</blue>"]);
            case 12:
                return new SolveActionResult(this, ["Do you want to interact with any of these <blue>Torches</blue>?"], options);
            default:
                const torchIndex: number = Math.floor((choiceId - 1) / 2);
                playerSession.torchesLit[torchIndex] = choiceId % 2 === 1 ? 1 : 0;
                return new SolveActionResult(this, ["Do you want to light another torch?"], [
                    new SolveChoiceAction(12, "Yes"),
                    new SolveChoiceAction(11, "No")
                ]);
        }
    }    
}

          

