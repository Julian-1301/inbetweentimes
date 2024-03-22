import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const MuanualItemAlias: string = "Manual";

export class MuanualItem extends Item implements Examine, Pickup {
    public constructor() {
        super(MuanualItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Muanual";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpManual) {
            return new TextActionResult([
                "A book with the title: 'Manual'",
                "The book looks damaged",
                "Perhaps I should pick it up"
            ]);
        } else if (
            playerSession.pickedUpManual
        ) {
            return new TextActionResult([
                "When opening the manual you see that alot of pages are torn out",
                "Luckely some pages are still there"
            ]);
        } else if (
            playerSession.pickedUpManual &&
            playerSession.LogbookPuzzleSolved
        ) {
            return new TextActionResult([
                "You quickly skim through the remaining pages untill you find a page called 'reset'",
                "The page states:",
                "LLRLRRLR"
            ]);
        } else {
            return new TextActionResult([
                "It's a yellow hard cover book with the title: 'Manual'",
                "Perhaps I should pick it up to investigate further",
            ]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpManual) {
            playerSession.pickedUpManual = true;

            return new TextActionResult(["You pick up the manual"]);
        } else return new TextActionResult(["You already picked up the manual"]);
    }
}
