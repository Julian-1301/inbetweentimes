import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { Examine,  ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Character } from "../../base/gameObjects/Character";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";

export const ShadyFigureCharacterAlias: string = "shadyfigure";

export class ShadyFigureCharacter extends Character implements Examine, Pickup {
    public constructor() {
        super(ShadyFigureCharacterAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Shady Figure";
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        switch(choiceId) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                return new TextActionResult(["Incorrect."]);
            case 7:
                getPlayerSession().oasisPuzzleHints[2] = 1;
            return new TextActionResult(["Correct, I will reward you by giving you a clue,", "<blue>'Immerse yourself in the fluid embrace, where rivers carve paths and oceans hold mysteries in their depths.'</blue>", "Maybe there are other clues hidden around?"]);
                case 8:
            return new TextActionResult(["I don't even know what that is.", "Is that an actual color?", "How is that one of the first colors you think of?"]);
                case 9:
            return new TextActionResult(["Wowww, how do you not know pink is my favorite color."]);
        }

        return new TalkActionResult(this, ["If it is information you seek,", "tell me one thing.....", "What is my favorite color?"], 
        [
        new TalkChoiceAction(1, "Red"),
        new TalkChoiceAction(2, "Orange"),
        new TalkChoiceAction(3, "Yellow"),
        new TalkChoiceAction(4, "Green"),
        new TalkChoiceAction(5, "Blue"),
        new TalkChoiceAction(6, "Purple"),
        new TalkChoiceAction(7, "Pink"),
        new TalkChoiceAction(8, "Coquelicot"),
        new TalkChoiceAction(9, "I don't know")
    ]);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The <blue>Shady Figure</blue> stares at you from a distance..", "You do not know if he is friendly yet,","Should you approach him?"]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["Hey, what are you doing!", "Put me down right now!"]);
    }
}