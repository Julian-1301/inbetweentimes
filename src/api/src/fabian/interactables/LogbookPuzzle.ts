import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { SolveChoiceAction } from "../../julian/actions/SolveAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const LogbookPuzzleAlias: string = "Logbook";

export class LogbookPuzzle extends Interactable {
    public constructor() {
        super(LogbookPuzzleAlias);
    }

    public name(): string {
        return "Logbook Puzzle";
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.logPuzzleTried = true;

        switch (choiceId) {
            case 0:
            case 1:
                playerSession.LogbookPuzzleSolved = true;
                return new TextActionResult(["That's right! perhaps I should read the <blue>Logbook</blue> again."]
                );
            case 2:
                return new TextActionResult(["hmm... that doesn't seem right..."]
            );
        }

        return new SolveActionResult(this, ["Which months decryptionkey is it?"], 
        [
        new SolveChoiceAction(2, "January"),
        new SolveChoiceAction(2, "February"),
        new SolveChoiceAction(2, "March"),
        new SolveChoiceAction(2, "April"),
        new SolveChoiceAction(2, "May"),
        new SolveChoiceAction(2, "June"),
        new SolveChoiceAction(2, "July"),
        new SolveChoiceAction(2, "August"),
        new SolveChoiceAction(2, "September"),
        new SolveChoiceAction(1, "October"),
        new SolveChoiceAction(2, "November"),
        new SolveChoiceAction(2, "December")
    ]);
    }

}
