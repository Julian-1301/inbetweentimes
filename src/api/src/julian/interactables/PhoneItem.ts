import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { SolveChoiceAction } from "../actions/SolveAction";
import { NotebookItemAlias } from "../items/NotebookItem";
import { WatchItemAlias } from "./WatchItem";


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
        return new TextActionResult(["I don't think this is what i meant with picking up the <blue>Phone</blue>", "Maybe i should just use the <blue>Phone</blue> without lifting it up"]);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        switch(choiceId) {           
            case 1:
                return new SolveActionResult(this, ["Good afternoon <blue>Detective</blue>,", "I have two new cases for you so get your lazy ass up!", "One of them is in <blue>Ancient Egypt</blue> and the other is in a <blue>Cold War Submarine</blue>."], [
                    new SolveChoiceAction(3, "Ask about the first case"),
                    new SolveChoiceAction(4, "Ask about the second case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 2:
                return new TextActionResult(["You decide to leave the <blue>Phone</blue> alone for now."]);
            case 3:
                return new SolveActionResult(this, ["A <blue>Golden Scarab</blue> has been stolen from a <blue>Pyramid</blue> and your task is to figure out what happened,", "You must solve puzzles and explore the area.", "Don't forget that the world around you will look more primitive too."], [
                    new SolveChoiceAction(4,"Tell me about the Cold War case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 4:
                return new SolveActionResult(this, ["A <blue>Cold War Submarine</blue> has been sabotaged,", "If you don't find out what happend it could cause a whole lot of problems.", "Don't dissapoint!"], [
                    new SolveChoiceAction(3,"Tell me about the Ancient Egypt case"),
                    new SolveChoiceAction(5, "I know enough")
                ]);
            case 5:
                playerSession.callNumber++;
                playerSession.inventory.push(WatchItemAlias);
                playerSession.inventory.push(NotebookItemAlias);
                return new TextActionResult(["Good luck <blue>Detective</blue>", "Call me back whenever you solve one of these cases", "You pick up your <blue>Travel-Watch</blue> that you can use to time travel and your <blue>Notebook</blue> that you can use to <blue>Examine</blue> gathered clues"]);
            case 6:
                playerSession.callNumber++;
                return new TextActionResult(["Hmmm... that sounds very interesting, I will take note of this.", "Great work <blue>Detective</blue>,", "I think i see some similarities with a new case I have but I need you to make sure you have solved your other case to be sure.", "Call me back when you have done so!" ]);
            case 7:
                playerSession.callNumber++;
                return new TextActionResult(["Hmmm... peculiar, I'll look into it some more, great work!"]);
            case 8:
                playerSession.callNumber++;
                return new TextActionResult(["Thank you for this information <blue>Detective</blue>!", "I am putting you on a new case based on your gathered evidence,", "You are tasked to track down the <blue>Cult</blue> that is responsible for all this chaos,", "There have been sightings at an <blue>Aztec Temple</blue>, Please use your <blue>Travel-watch</blue> to go there and catch these criminals."]);
        }

        if (playerSession.callNumber === 0) {
        return new SolveActionResult(this, ["You grab your <blue>Phone</blue>", "Will you pick up?"], [
            new SolveChoiceAction(1, "Yes"),
            new SolveChoiceAction(2, "No"),
        ]);
    } else if (playerSession.pickedupGoldenScarab && playerSession.callNumber === 1) {
        return new SolveActionResult(this, ["You grab your <blue>Phone</blue>", "You should call your <blue>Boss</blue> to tell him about the <blue>Egypt</blue> case?", "Do you want to call him now?"], [
            new SolveChoiceAction(6, "Yes"),
            new SolveChoiceAction(2, "No"),
        ]);
    } else if (playerSession.coldWarSolved && playerSession.callNumber === 1) {
        return new SolveActionResult(this, ["You grab your <blue>Phone</blue>", "You should call your <blue>Boss</blue> to tell him about the <blue>Cold war</blue> case?", "Do you want to call him now?"], [
            new SolveChoiceAction(7, "Yes"),
            new SolveChoiceAction(2, "No"),
        ]);
    } else if (playerSession.callNumber === 2 && playerSession.pickedupGoldenScarab && playerSession.coldWarSolved) {
        return new SolveActionResult(this, ["You grab your <blue>Phone</blue>", "You should call your <blue>Boss</blue> to tell him you completed both cases?", "Do you want to call him now?"], [
            new SolveChoiceAction(8, "Yes"),
            new SolveChoiceAction(2, "No"),
        ]);
    } else return new TextActionResult(["I have no reason to call anyone right now"]);
    }
}