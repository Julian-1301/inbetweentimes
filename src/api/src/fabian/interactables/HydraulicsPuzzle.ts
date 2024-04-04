import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { SolveChoiceAction } from "../../julian/actions/SolveAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const HydraulicsPuzzleAlias: string = "Hydraulics";

export class HydraulicsPuzzle extends Interactable {
    public constructor() {
        super(HydraulicsPuzzleAlias);
    }

    public name(): string {
        return "Hydraulics Puzzle";
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        switch (choiceId) {
            case 0:
            case 1:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 1 go second?"],
                    [new SolveChoiceAction(2, "Left"), new SolveChoiceAction(10, "Right")]
                );
            case 2:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 2 go first?"],
                    [new SolveChoiceAction(11, "Left"), new SolveChoiceAction(3, "Right")]
                );
            case 3:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 2 go second?"],
                    [new SolveChoiceAction(4, "Left"), new SolveChoiceAction(12, "Right")]
                );
            case 4:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 3 go first?"],
                    [new SolveChoiceAction(13, "Left"), new SolveChoiceAction(5, "Right")]
                );
            case 5:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 3 go second?"],
                    [new SolveChoiceAction(14, "Left"), new SolveChoiceAction(6, "Right")]
                );
            case 6:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 4 go first?"],
                    [new SolveChoiceAction(7, "Left"), new SolveChoiceAction(15, "Right")]
                );
            case 7:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 4 go second?"],
                    [new SolveChoiceAction(16, "Left"), new SolveChoiceAction(8, "Right")]
                );
            case 8:
                playerSession.hydraulicsPuzzleSolved = true;
                return new TextActionResult([
                    "At first nothing happens..",
                    "But then you hear the sound of air rushing through the valves,",
                    "slowly stuff is starting to move",
                    "Whilst admiring this past technology you hear a thud on the floor next to you,",
                    "You see a wierd looking <blue>Tablet</blue>...",
                ]);
            case 9:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 1 go second?"],
                    [new SolveChoiceAction(10, "Left"), new SolveChoiceAction(10, "Right")]
                );
            case 10:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 2 go first?"],
                    [new SolveChoiceAction(11, "Left"), new SolveChoiceAction(11, "Right")]
                );
            case 11:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 2 go second?"],
                    [new SolveChoiceAction(12, "Left"), new SolveChoiceAction(12, "Right")]
                );
            case 12:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 3 go first?"],
                    [new SolveChoiceAction(13, "Left"), new SolveChoiceAction(13, "Right")]
                );
            case 13:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 3 go second?"],
                    [new SolveChoiceAction(14, "Left"), new SolveChoiceAction(14, "Right")]
                );
            case 14:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 4 go first?"],
                    [new SolveChoiceAction(15, "Left"), new SolveChoiceAction(15, "Right")]
                );
            case 15:
                return new SolveActionResult(
                    this,
                    ["Which way should valve 4 go second?"],
                    [new SolveChoiceAction(16, "Left"), new SolveChoiceAction(16, "Right")]
                );
            case 16:
                return new TextActionResult(["hmm... nothing happend, perhaps I'm missing something."]);
        }

        return new SolveActionResult(
            this,
            ["Which way should valve 1 go first?"],
            [new SolveChoiceAction(1, "Left"), new SolveChoiceAction(9, "Right")]
        );
    }

}
