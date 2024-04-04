import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { SolveChoiceAction } from "../actions/SolveAction";
import { GameOverRoom } from "../rooms/GameOverRoom";

export const ComputerItemAlias: string = "computer";

export class ComputerItem extends Interactable implements Examine, Pickup {

    public constructor() {
        super(ComputerItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Computer";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Your trusty old <blue>Computer</blue> is powered on", "You haven't caught up with your e-mails yet", "Maybe you can use it for some detective work"]);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const deletables: any[] = [];
        const searchables: any[] = [];
    
        if (playerSession.deletedBrowser === false) {
            deletables.push(new SolveChoiceAction(6, "Old Webbrowser"));
        }
        if (playerSession.deletedPictures === false) {
            deletables.push(new SolveChoiceAction(7, "Family Pictures"));
        }
        deletables.push(new SolveChoiceAction(8, "System32"));
        if (playerSession.deletedScript === false) {
            deletables.push(new SolveChoiceAction(9, "Movie Script"));
        }
        deletables.push(new SolveChoiceAction(10, "Cancel"));

        if (playerSession.starmapInspected === true) {
            searchables.push(new SolveChoiceAction(14, "Stars"));
        }
        searchables.push(new SolveChoiceAction(12, "The question to life"));
        searchables.push(new SolveChoiceAction(13, "Animal fact"));
        searchables.push(new SolveChoiceAction(15, "Cancel"));
        
        switch(choiceId) {
            case 1:
                return new SolveActionResult(this, ["You check your mail"], [
                    new SolveChoiceAction(2, "Spammail"),
                    new SolveChoiceAction(3, "Cryptic Hint"),
                    new SolveChoiceAction(4, "Work report")
                ]);
            case 2:
                return new TextActionResult(["Congratulations! You've won a luxury vacation to an exotic island!","Claim your prize now by clicking the link below.", "Act fast before this exclusive offer expires.", "Don't miss out on this incredible opportunity!"]);
            case 3:
                playerSession.oasisPuzzleHints[0] = 1;
                return new TextActionResult(["Dear Seeker, Within the whispers of nature lies a clue: <blue>'Begin your journey amidst the solidity of the earth, where mountains stand tall and valleys stretch wide.'</blue>", "Seek this juncture, where elements intertwine. Answers emerge where transitions blur. Unravel the enigma that awaits.", "You should write this down in your notebook"],);
            case 4:
                return new TextActionResult(["Hey buddy,", "I hate to say it, but your recent performance is a bit disappointing", "I know you've got the skills", "so let's figure out what's up and get you back on track", "We're all counting on you to bring your A-game"]);
            case 5:
                return new SolveActionResult(this, ["Which files do you want to delete?"], deletables);
            case 6:
                playerSession.deletedBrowser = true;
                return new TextActionResult(["You delete your old browser", "You only ever used this to install chrome anyways"]);
            case 7:
                playerSession.deletedPictures = true;
                return new TextActionResult(["You delete your family pictures", "You can't trust anyone nowadays", "Not even your own family"]);
            case 8:
                playerSession.currentRoom = new GameOverRoom().alias;
                return new TextActionResult(["You deleted system32", "You lose all your evidence and are fired as a result", "Try again"]);
            case 9: 
                playerSession.deletedScript = true;
                return new TextActionResult(["You delete your movie script", "Time to give up on your lifelong dreams", "You shed a tear"]);
            case 10:
                return new TextActionResult(["You decide not to delete anything this time"]);
            case 11:
                return new SolveActionResult(this, ["Search on world's best search engine: Noodle!"], searchables);
            case 12:
                return new TextActionResult(["The answer to the ultimate question of life, the universe, and everything is 42"]);
            case 13:
                return new TextActionResult(["Fun Fact! Snails can jump up to 4 centimeters!"]);
            case 14:
                playerSession.searchedStars = true;
                return new TextActionResult(["Stars gradually shift to the right every month."]);
            case 15:
                return new TextActionResult(["You decide not to search for articles that serve your self-interest."]);
        }
    
        return new SolveActionResult(this, ["You log in to your <blue>Computer</blue>", "What will you do?"], [
            new SolveChoiceAction(1, "Check e-mail"),
            new SolveChoiceAction(5, "Delete files"),
            new SolveChoiceAction(11, "Noodle search")
        ]);
    }

    public pickup(): ActionResult | undefined {
        return undefined;
    }
}