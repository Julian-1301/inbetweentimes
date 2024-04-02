import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const ManualItemAlias: string = "Manual";

export class ManualItem extends Item implements Examine, Pickup {
    public constructor() {
        super(ManualItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Manual";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpManual) {
            return new TextActionResult([
                "A book with the title: <blue>Manual</blue>",
                "The book looks damaged",
                "Perhaps I should pick it up"
            ]);
        } else if (
            playerSession.pickedUpManual && !playerSession.LogbookPuzzleSolved
        ) {
            return new TextActionResult([
                "When opening the <blue>manual</blue> you see that alot of pages are torn out",
                "Luckely some pages are still there",
                "The manual seems to be <blue>encrypted</blue>"
            ]);
        } else if (
            playerSession.pickedUpManual &&
            playerSession.LogbookPuzzleSolved
        ) {
            return new TextActionResult([
                "You quickly skim through the remaining pages untill you find a page called 'reset'",
                "The page states:",
                "<blue>LLRLRRLR</blue>"
            ]);
        } else {
            return new TextActionResult([
                "It's a yellow hard cover book with the title: <blue>Manual</blue>",
                "Perhaps I should pick it up to investigate further",
            ]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpManual) {
            playerSession.pickedUpManual = true;

            return new TextActionResult(["You pick up the <blue>manual</blue>"]);
        } else return new TextActionResult(["You already picked up the <blue>manual</blue>"]);
    }
}
