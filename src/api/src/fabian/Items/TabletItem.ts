import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const TabletItemAlias: string = "Tablet";

export class TabletItem extends Item implements Examine, Pickup {
    public constructor() {
        super(TabletItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Tablet";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The tablet looks ancient","You look closer and see unkown hyroglifics inscribed in the tablet","How did this tablet end up here? and why?"]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpTablet) {
            playerSession.pickedUpTablet = true;
            playerSession.inventory.push(TabletItemAlias);

            return new TextActionResult(["You pick up the tablet"]);
        }
        else
        return new TextActionResult(["You already picked up the tablet"]);
    }

}