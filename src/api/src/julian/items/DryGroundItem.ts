import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";

export const DrygroundItemAlias: string = "dryground";

export class DrygroundItem extends Item implements Examine, Pickup {
    public constructor() {
        super(DrygroundItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.drygroundValue === 0) {
            return "Dry Ground";
        } else if (playerSession.drygroundValue === 1) {
            return "Dry Plant";
        } else {
            return "Healthy Plant";
        }
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.drygroundValue === 0) {
        return new TextActionResult(["This <blue>Ground</blue> looks like it could use some life", "It currently looks too <blue>Dry<blue> for anything to survive though"]);
        } else if (playerSession.drygroundValue === 1) {
            return new TextActionResult(["The <blue>Plant</blue> looks really <blue>dry</blue>", "Maybe you can find a way to give it some life"]);
        } else {
            return new TextActionResult(["Your old <blue>Plant</blue> looks nice and healthy now", "It makes you happy to see it sprout new leaves"]);
        }
    }

    public pickup(): ActionResult | undefined {
        return undefined;
    }
}