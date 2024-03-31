import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { Examine,  ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Character } from "../../base/gameObjects/Character";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";

export const AnubisStatueCharacterAlias: string = "anubisstatue";

export class AnubisStatueCharacter extends Character implements Examine {
    public constructor() {
        super(AnubisStatueCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Anubis Statue";
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const riddle : any[] = [];
        const choices: any[] = [];
    
        for (let i: number = 1; i <= 26; i++) {
            choices.push(new TalkChoiceAction(i, String.fromCharCode(96 + i)));
        }
        choices.push(new TalkChoiceAction(27, "Enter"));
        choices.push(new TalkChoiceAction(28, "Delete"));
        choices.push(new TalkChoiceAction(30, "Cancel"));

        if (playerSession.riddleValue === 1) {
            riddle.push("Wrapped in linen, laid to rest, In golden tombs, I'm at my best.", "With ancient script upon my side, What am I, where pharaohs hide?");
        } else if (playerSession.riddleValue === 2) {
            riddle.push("With crook and flail, I rule the land, In regal splendor, I take my stand.", "A crown upon my noble brow, What am I, in power's vow?");
        } else if (playerSession.riddleValue === 3) {
            riddle.push("In temples grand, I guard the way, With lion's body, and human sway.", "A mighty beast of ancient lore, What am I, at temple's door?");
        } else if (playerSession.riddleValue === 4) {
            riddle.push("In desert sands, I rise on high, With pointed peak against the sky.", "A resting place for royalty, What am I, in history?");
        }
        
        if (choiceId !== undefined && choiceId >= 1 && choiceId <= 26) {
            playerSession.currentWord += String.fromCharCode(96 + choiceId);
            return new TalkActionResult(this, ["You currently have: " + playerSession.currentWord], choices);
        } else if (choiceId === 27) {
            if (playerSession.currentWord === "mummy" && playerSession.riddleValue === 1) {
                playerSession.currentWord = "";
                playerSession.riddleValue++;
                return new TextActionResult(["Correct...", "The <blue>Statue</blue> starts sinking into the ground but nothing else seems to happen", "You are wondering where it went"]);
            } else if (playerSession.currentWord === "pharaoh" && playerSession.riddleValue === 2) {
                playerSession.currentWord = "";
                playerSession.riddleValue++;
                return new TextActionResult(["Correct"]);
            } else if (playerSession.currentWord === "sphinx" && playerSession.riddleValue === 3) {
                playerSession.currentWord = "";
                playerSession.riddleValue++;
                return new TextActionResult(["Correct"]);
            } else if (playerSession.currentWord === "pyramid" && playerSession.riddleValue === 4) {
                playerSession.currentWord = "";
                playerSession.riddleValue = 1;
                return new TextActionResult(["Correct"]);
            } else {
                playerSession.currentWord = "";
                return new TextActionResult(["Incorrect"]);
            }
        } else if(choiceId === 28) {
            playerSession.currentWord = playerSession.currentWord.slice(0, -1);
            return new TalkActionResult(this, ["You currently have: " + playerSession.currentWord], choices);
        } else if(choiceId === 29){
            return new TalkActionResult(this, ["You currently have: " + playerSession.currentWord], choices);
        } else if(choiceId === 30) {
            playerSession.currentWord = "";
            return new TextActionResult(["Come back when you know the answer to my riddle"]);
        }
    
        if (playerSession.hierogliphPuzzleSolved) {
            return new TalkActionResult(this, riddle, [
                new TalkChoiceAction(29, "I know the answer"),
                new TalkChoiceAction(30, "I don't know the answer")
            ]);
        } else {
            return undefined;
        }
    }
    
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.hierogliphPuzzleSolved) {
            return new TextActionResult(["A small stone <blue>Statue</blue> that sits in the corner", "It resembles <blue>Anubis</blue> and is made of stone"]);
        } else {
            return new TextActionResult(["The <blue>Statue</blue> spoke to you", "It wants you to answer his <blue>Riddles</blue> to find the truth", "Whatever that means..."]);
        };
    }
}