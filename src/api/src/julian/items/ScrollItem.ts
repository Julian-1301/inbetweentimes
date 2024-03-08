import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
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
        return new TextActionResult(["The scroll is covered in sand","You wipe it clean and read:","Before the storm, but not at the calm's start","this seems important for something else in this area"]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpScroll) {
            playerSession.pickedUpScroll = true;
            playerSession.inventory.push(ScrollItemAlias);

            return new TextActionResult(["You pick up the scroll"]);
        }
    
        return undefined;    
    }

}