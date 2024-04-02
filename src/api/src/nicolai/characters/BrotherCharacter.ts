import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { PlayerSession } from "../../types";
import { BrotherHeartAlias } from "../items/BrotherHeart";


export const BrotherCharacterAlias:string = "Statue's Brother";

export class BrotherCharacter extends Character implements Examine, Pickup{
    public constructor(){
        super(BrotherCharacterAlias, PickupActionAlias);
    }
    public name(): string {
        return "Statue's Brother";
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["The statue is way to heavy for you..."]);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Its an old stone statue but not as old as the other one "]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const options: any[] = [];
        const playerSession: PlayerSession = getPlayerSession();
    
        if (playerSession.aztecTalkValue > 0) {
            options.push(new TalkChoiceAction(8, "Ask Question"));
        }
        if (playerSession.pickedUpBrotherHeart) {
            options.push(new TalkChoiceAction(9, "I got something for you"));
        }
        options.push(new TalkChoiceAction(1, "Touch the statue"));
        
    
        switch (choiceId) {
            case 1:
                return new TextActionResult(["This is just invading my privacy"]);
            case 2:
                return new TalkActionResult(this, ["You want my help? Then you need to help me first"], [
                    new TalkChoiceAction(4, "How can I help you?"),
                    new TalkChoiceAction(5, "No, I don't feel like it")
                ]);
            case 4:
                playerSession.aztecTalkValue++;
                return new TalkActionResult(this, ["You need to find a new heart for me. As you can see, I have a hole in the middle of my chest. Some Spanish geezer stole my heart a long time ago"], [
                    new TalkChoiceAction(5, "Ok, I'll try my best"),
                    new TalkChoiceAction(6, "I am short on time, sorry")
                ]);
            case 8:
                return new TalkActionResult(this, ["Ugh, is this really needed?"], [
                    new TalkChoiceAction(2, "I really need some answers of this place"),
                    new TalkChoiceAction(3, "If you don't want to talk then fine")
                ]);
            case 9: 
                return new TalkActionResult(this, ["Is that my heart?"], [
                    new TalkChoiceAction(10, "Yes it is here you go now can you help me?"),
                    new TalkChoiceAction(11, "No")
                ]);
            case 10:
                playerSession.inventory = playerSession.inventory.filter(item => item !== BrotherHeartAlias);
                return new TalkActionResult(this, ["WOW I haven't seen this in a really long time thank you, small human!!"], [
                    new TalkChoiceAction(12, "Well, can you now finally help me")
                ]);
            case 11:
                return new TextActionResult(["then why say you have something?", "Making people happy for nothing tsh..."]);
            case 12:
                return new TextActionResult(["I'll give you one of the three numbers to the code here", "There is a huge door between me and my brother and it has a code. I'll give you the first number", "The first number is 6"]);
            default:
                return new TalkActionResult(this, ["What do you want, little human?"], options);
        }
    }
}    