import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";

export const NotebookItemAlias: string = "Notebook";

export class NotebookItem extends Item implements Examine, Pickup{
    public constructor() {
        super(NotebookItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Notebook";
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["You already picked up the <blue>Notebook</blue>"]);
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const hints: any[] = [];

        if (playerSession.oasisPuzzleHints.includes(1))
        hints.push("<blue>Elemental clues:</blue>");
        if (playerSession.oasisPuzzleHints[0] === 1) {
        hints.push("-Begin your journey amidst the solidity of the earth, where mountains stand tall and valleys stretch wide.");
        } 
        if (playerSession.oasisPuzzleHints[1] === 1) {
            hints.push("-Ascend into the ethereal domain, where winds carry whispers and storms paint the sky with fury.");
        } 
        if (playerSession.oasisPuzzleHints[2] === 1) {
            hints.push("-Immerse yourself in the fluid embrace, where rivers carve paths and oceans hold mysteries in their depths.");
        } 
        if (playerSession.oasisPuzzleHints[3] === 1) {
            hints.push("-Ignite the flames that dance with passion and fury, consuming all in their path and illuminating the darkest of nights.");
        }

        if (playerSession.oasisPuzzleHints.includes(1) && playerSession.logPuzzleTried) {
            hints.push(".");
        }
        if (playerSession.logPuzzleTried) {
            hints.push("<blue>Submarine clues:</blue>");
            hints.push("Since you can almost count the amount of pixels of the <blue>starmap</blue>... <blue>It's October</blue>");
        }

        if (!playerSession.oasisPuzzleHints.includes(1) && !playerSession.logPuzzleTried) {
            return new TextActionResult(["You haven't written anything down in your notebook yet", "Gather clues and <blue>Examine your Notebook</blue> to see your hints"]);
        } else {
            return new TextActionResult(hints);
        }
    }
}