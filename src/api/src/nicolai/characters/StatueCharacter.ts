import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";

export const StatueCharacterAlias: string = "Statue";
export class StatueCharacter extends Character implements Examine, Pickup{
  
    public constructor() {
        super (StatueCharacterAlias, ExamineActionAlias, PickupActionAlias);
    }
 
    public name(): string {
        return "statue";
    }
    public pickup(): ActionResult | undefined {
        return new TextActionResult(["The statue is way to heavy for you..."]);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Its an old stone statue..."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        
        if(choiceId === 1){
            return new TextActionResult(["That is harrasment"]);
        }
        if (choiceId === 2){
            return new TextActionResult(["Hmmm thats a question you can answer yourself"]);
        }
        if (choiceId === 3){
            return new TextActionResult(["If im correct i saw someone else just a second ago"]);
        }
        if (choiceId === 4){
            return new TextActionResult(["I am as old as this tempel itself"]);
        }
        if (choiceId === 5){
            return new TextActionResult(["I wish i could leave but i am a statue i cant move"]);
        }
        if (choiceId === 6){
            return new TextActionResult(["That is my little brother you can talk to him if you want but he is really annoying"]);
        }
        if(choiceId === 8){
            return new TalkActionResult(this, ["Ahh you seek answers of this place", "Tell me human", "What do you want to know?"], 
            [
            new TalkChoiceAction(2, "What do i need to do here?"),
            new TalkChoiceAction(3, "Is there someone else here?"),
            new TalkChoiceAction(4, "How old are you?"),
            new TalkChoiceAction(5, "Why are you here?"),
            new TalkChoiceAction(6, "Who is that other statue?"),
        ]);
        
        }
        return new TalkActionResult(this,["Welcome to my home. I am a statue."], 
        [new TalkChoiceAction(1,"Touch the statue"),
        new  TalkChoiceAction(8,"Ask a Question")]);
        
 
    }

  
}