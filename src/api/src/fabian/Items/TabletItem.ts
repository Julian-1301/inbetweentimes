import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
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
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpTablet && playerSession.currentRoom === "egyptian") {
            return new TextActionResult([
                "-Breathe life into darkness, let the left torch blaze alone, while shadows shroud the others in mystery",
                "-Nurture hope in barren soil, where thirst reigns supreme, a sapling yearns for a sip of life's elixir",
                "-Unlock the whispers of the earth's secrets, as your touch ignites the ancient dance of shifting tiles, thrice upon the cracked surface",
            ]);
        } else if (playerSession.pickedUpTablet) {
            return new TextActionResult([
                "The tablet looks out of place",
                "You try to look closer but it is too hard to make out",
                "Maybe it makes more sense in a different place",
            ]);
        } else {
            return new TextActionResult([
                "You can see an ancient looking tablet laying around",
                "It might seem useful",
            ]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpTablet) {
            playerSession.pickedUpTablet = true;
            playerSession.inventory.push(TabletItemAlias);

            return new TextActionResult(["You pick up the tablet"]);
        } else return new TextActionResult(["You already picked up the tablet"]);
    }
}
