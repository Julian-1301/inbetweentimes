import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Item } from "../../base/gameObjects/Item";


export const GoldenScarabItemAlias: string = "goldenscarab";

export class GoldenScarabItem extends Item implements Examine, Pickup {
    public constructor() {
        super(GoldenScarabItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Golden Scarab";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You spot the <blue>Golden Scarab</blue>", "It looks like a badly faked replica, The golden paint is dripping off", "You should take it back to your <blue>Office</blue> to check for fingerprints", "You should let your boss know you're done here"]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedupGoldenScarab) {
            playerSession.pickedupGoldenScarab = true;

            return new TextActionResult(["You pick up the <blue>Golden Scarab</blue> and send it to the lab by using your <blue>Travel-watch</blue>", "You should call your <blue>Boss</blue> now like you promised"]);
        } else {
            return undefined;
        }
    }
}
