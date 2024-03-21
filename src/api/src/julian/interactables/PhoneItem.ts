import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { SolveChoiceAction } from "../actions/SolveAction";

export const PhoneItemAlias: string = "phone";

export class PhoneItem extends Interactable implements Examine {

    public constructor() {
        super(PhoneItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Phone";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Your trusty old phone is powered on", "You haven't caught up with your e-mails yet", "Maybe you can use it for some detective work"]);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        switch(choiceId) {
            case 1:
                return new SolveActionResult(this, ["Good afternoon detective", "I have two new cases for you so get your lazy ass up", "One of them is in ancient egypt and the other in a cold war submarine"], [
                    new SolveChoiceAction(3, "Ask about the first case"),
                    new SolveChoiceAction(4, "Ask about the second case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 2:
                return new TextActionResult(["You decide not to answer the phone"]);
            case 3:
                return new SolveActionResult(this, ["A golden scarab has been stolen from a temple and your task is to figure out what happened", "You must solve puzzles and explore the area"], [
                    new SolveChoiceAction(4,"Tell me about the cold war case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 4:
                return new SolveActionResult(this, ["test", "test"], [
                    new SolveChoiceAction(3,"Tell me about the egypt case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 5:
                playerSession.callNumber = 0;
                return new TextActionResult(["Good luck detective", "Call me back whenever you solve one of these cases"]);
        }

        if (playerSession.callNumber === 1) {
        return new SolveActionResult(this, ["You grab your phone", "Will you pick up?"], [
            new SolveChoiceAction(1, "Yes"),
            new SolveChoiceAction(2, "No"),
        ]);
    } else return new TextActionResult(["I have no reason to call anyone right now"]);
    }
}