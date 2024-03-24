import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { SolveChoiceAction } from "../actions/SolveAction";


export const PhoneItemAlias: string = "phone";

export class PhoneItem extends Interactable implements Examine, Pickup {

    public constructor() {
        super(PhoneItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Phone";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Your <blue>Phone</blue> is really old and looks just like a brick", "It's too heavy to pick up so maybe you can just use it without grabbing it"]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["I don't think this is what i meant with picking up the <blue>Phone</blue>", "Maybe i should just use the <blue>Phone</blue> without picking it up"]);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        switch(choiceId) {
            case 1:
                return new SolveActionResult(this, ["Good afternoon <blue>Detective</blue>", "I have two new cases for you so get your lazy ass up", "One of them is in <blue>Ancient Egypt</blue> and the other in a <blue>Cold War Submarine</blue>"], [
                    new SolveChoiceAction(3, "Ask about the first case"),
                    new SolveChoiceAction(4, "Ask about the second case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 2:
                return new TextActionResult(["You decide not to answer the <blue>Phone</blue>"]);
            case 3:
                return new SolveActionResult(this, ["A <blue>golden scarab</blue> has been stolen from a <blue>Pyramid</blue> and your task is to figure out what happened", "You must solve puzzles and explore the area"], [
                    new SolveChoiceAction(4,"Tell me about the <blue>Cold War</blue> case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 4:
                return new SolveActionResult(this, ["test", "test"], [
                    new SolveChoiceAction(3,"Tell me about the <blue>Ancient Egypt</blue> case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 5:
                playerSession.callNumber = 0;
                return new TextActionResult(["Good luck <blue>Detective</blue>", "Call me back whenever you solve one of these cases"]);
        }

        if (playerSession.callNumber === 1) {
        return new SolveActionResult(this, ["You grab your <blue>Phone</blue>", "Will you pick up?"], [
            new SolveChoiceAction(1, "Yes"),
            new SolveChoiceAction(2, "No"),
        ]);
    } else return new TextActionResult(["I have no reason to call anyone right now"]);
    }
}