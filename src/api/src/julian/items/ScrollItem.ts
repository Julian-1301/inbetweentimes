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
            playerSession.oasisPuzzleHints[1] = 1;
            playerSession.oasisPuzzleHints[3] = 1;
            playerSession.inventory = playerSession.inventory.filter(item => item !== ScrollItemAlias);
            return new TextActionResult(["The <blue>Scroll</blue> is covered in sand, You wipe it clean and read:","<blue>'Ascend into the ethereal domain, where winds carry whispers and storms paint the sky with fury.'</blue>", "<blue>'Ignite the flames that dance with passion and fury, consuming all in their path and illuminating the darkest of nights.'</blue>","You write this down and put the scroll somewhere else"]);
        } else {
            return new TextActionResult(["Something is covered in sand.", "It's impossible to read it like this,", "Maybe you should pick it up first?"]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpScroll) {
            playerSession.pickedUpScroll = true;
            playerSession.inventory.push(ScrollItemAlias);

            return new TextActionResult(["You pick up the <blue>Scroll</blue>."]);
        }
        else
        
        return new TextActionResult(["You already picked up the <blue>Scroll</blue>."]);
    }

}