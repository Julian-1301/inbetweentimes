import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { SolveChoiceAction } from "../../julian/actions/SolveAction";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { GameOverRoom } from "../../julian/rooms/GameOverRoom";

export const FinalDoorAlias: string = "Aztec Door";

export class FinalDoor extends Interactable implements Examine, Pickup {
    public constructor() {
        super(FinalDoorAlias, ExamineActionAlias, PickupActionAlias);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        switch (choiceId) {
            case 1:
                return new SolveActionResult(this, ["What code do you want to put in?"], [
                    new SolveChoiceAction(3, " "),
                    new SolveChoiceAction(4, " ")
                ]);
            case 2:
                return new TextActionResult(["You decide that you don't want to try putting in a code just yet."]);
            case 3:
                return new TextActionResult([]);
            case 4:
                playerSession.currentRoom = new GameOverRoom().alias;
                return new TextActionResult(["You enterted a wrong code.","A small trap was activated and shot an arrow that killed you.", "Try again"]);
        }
        return new SolveActionResult(this, ["What do you want to do with the door?"], [
            new SolveChoiceAction(1, "Try and use the code manual"),
            new SolveChoiceAction(2, "Cancel")
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