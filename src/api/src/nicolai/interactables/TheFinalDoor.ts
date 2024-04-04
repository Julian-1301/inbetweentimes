import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { SolveChoiceAction } from "../../julian/actions/SolveAction";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";

export const FinalDoorAlias: string = "Aztec Door";

export class FinalDoor extends Interactable implements Examine, Pickup {
    public constructor() {
        super(FinalDoorAlias, ExamineActionAlias, PickupActionAlias);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const choices: any[] = [];

        for (let i: number = 0; i <= 9; i++) {
            choices.push(new SolveChoiceAction(i, i.toString()));
        }

        choices.push(new SolveChoiceAction(12, "Enter"));
        choices.push(new SolveChoiceAction(13, "Delete"));
        choices.push(new SolveChoiceAction(11, "Cancel"));

        if (choiceId !== undefined && choiceId >= 0 && choiceId <= 9) {
            playerSession.FinalDoorCode += choiceId.toString();
            return new SolveActionResult(this, ["You currently have: " + playerSession.FinalDoorCode], choices);
        } else if (choiceId === 10){
            return new SolveActionResult(this, ["You currently have: " + playerSession.FinalDoorCode], choices);
        } else if (choiceId === 12) {
            if(playerSession.FinalDoorCode === "267") {
                return new TextActionResult(["hoi"]);
            } else {
                return new TextActionResult(["Game over"]);
            }
        } else if (choiceId === 13) {
            playerSession.FinalDoorCode = playerSession.FinalDoorCode.slice(0, -1);
            return new SolveActionResult(this, ["You currently have: " + playerSession.FinalDoorCode], choices);
        } else if (choiceId === 11) {
            playerSession.FinalDoorCode = "";
            return new TextActionResult(["asdasd"]);
        }


        return new SolveActionResult(this, ["What do you want to do with the door?"], [
            new SolveChoiceAction(10, "Try and use the code manual"),
            new SolveChoiceAction(11, "Cancel")
        ]);
     
}

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a door with an old code mechanism."]);
    }

    public name(): string {
        return "The Temple Door.";
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["Thanks to your super strength you picked up the door with the entire temple.", "Of course not it was impossible to lift up."]);
    }
}
// or (let i: number = 0; i <= 9; i++) {
//     choices.push(new TalkChoiceAction(i));
// }