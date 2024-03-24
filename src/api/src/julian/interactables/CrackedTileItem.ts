import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { SolveChoiceAction } from "../actions/SolveAction";


export const CrackedTileItemAlias: string = "crackedtile";

export class CrackedTileItem extends Interactable implements Examine {

    public constructor() {
        super(CrackedTileItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Cracked Tile";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpCup) {
            return new TextActionResult([""]);
        } else {
            return new TextActionResult([""]);
        }
    }



    public solve(choiceId?: number | undefined): ActionResult | undefined {
       const playerSession: PlayerSession = getPlayerSession();
        switch(choiceId) {
            case 1:
                playerSession.crackedTileCount++;
                return new SolveActionResult(this, ["you pressed the <blue>Cracked Tile</blue> " + playerSession.crackedTileCount + " times", "Do you press it again"], [
                    new SolveChoiceAction(1, "Yes"),
                    new SolveChoiceAction(2, "No"),
                ]);
            case 2: 
                return new TextActionResult(["You decide to leave the tile alone"]);
        }

        return new SolveActionResult(this, ["You see a cracked tile, Do you press it?"], [
            new SolveChoiceAction(1, "Yes"),
            new SolveChoiceAction(2, "No"),
        ]);
    }
}