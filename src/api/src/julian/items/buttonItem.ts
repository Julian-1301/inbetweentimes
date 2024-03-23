import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const ButtonItemAlias: string = "button";

export class ButtonItem extends Item implements Examine, Pickup {
    public constructor() {
        super(ButtonItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Button";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpButton) {
            return new TextActionResult(["You see a bright red <blue>Button</blue> inside a chest after you solved the <blue>Puzzle</blue>", "It looks too advanced to belong in this era", "Maybe you should take it with you"]); 
        } else if (playerSession.currentRoom === "ColdWarRoom") {
            return new TextActionResult(["This seems like the right place to use this <blue>Button</blue>"]);
        } else {
        return new TextActionResult(["A bright red <blue>Button</blue>", "Maybe this could be of use at a different time"]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        
        if (!playerSession.pickedUpButton) {
            playerSession.pickedUpButton = true;
            playerSession.inventory.push(ButtonItemAlias);

            return new TextActionResult(["You pick up the <blue>Button</blue>"]);
        }
        else
        
        return new TextActionResult(["You already picked up the <blue>Button</blue>"]);
    }

}