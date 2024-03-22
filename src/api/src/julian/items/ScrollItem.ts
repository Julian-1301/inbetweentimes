import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const ScrollItemAlias: string = "scroll";

export class ScrollItem extends Item implements Examine, Pickup {
    public constructor() {
        super(ScrollItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Scroll";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.pickedUpScroll) {
            return new TextActionResult(["The scroll is covered in sand","You wipe it clean and read:","Before the storm, but not at the calm's start","this seems important for something else in this area"]);
        } else {
            return new TextActionResult(["Something is covered in sand", "It's impossible to read it like this", "Maybe you should pick it up first"]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpScroll) {
            playerSession.pickedUpScroll = true;
            playerSession.inventory.push(ScrollItemAlias);

            return new TextActionResult(["You pick up the scroll"]);
        }
        else
        
        return new TextActionResult(["You already picked up the Scroll"]);
    }

}