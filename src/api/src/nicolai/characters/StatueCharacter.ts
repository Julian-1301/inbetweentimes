
import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";
import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { PlayerSession } from "../../types";


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
        const playerSession: PlayerSession = getPlayerSession();
        const options: any[] = [     new TalkChoiceAction(2, "What do i need to do here?"),
        new TalkChoiceAction(3, "Is there someone else here?"),
        new TalkChoiceAction(4, "How old are you?"),
        new TalkChoiceAction(5, "Why are you here?"), 
        new TalkChoiceAction(6, "Who is that other statue?"),];

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
            playerSession.aztecTalkValue ++;
            return new TextActionResult(["That is my little brother you can talk to him if you want but he is really annoying"]);
        }
        if (choiceId === 9){
            return new TalkActionResult(this,["So what did he say?", "Anything intresting?"],
            [
                new TalkChoiceAction(10,"Yes he told me he needed a heart"),
                new TalkChoiceAction(11,"No i dont think he did")
            ]);
        }
        if (choiceId === 10){
            return new TalkActionResult(this,["Hmm i think i know where it is hidden"],
            [
                new TalkChoiceAction(12,"really can you tell me?")
            ]);
        }
        if (choiceId === 11){
            return new TextActionResult(["oh thats an bummer"]);
        }
        if (choiceId === 12){
            return new TextActionResult(["Its behind that big rock but you will need a tool to break it"]);
            
        }
        if(choiceId === 8){
            if (playerSession.aztecTalkValue > 0) {
                options.push(new TalkChoiceAction(9, "Did you talk to my brother?"));
            }
            return new TalkActionResult(this, ["Ahh you seek answers of this place", "Tell me human", "What do you want to know?"], 
            options
            );
        
        }
        return new TalkActionResult(this,["Welcome to my home. I am a statue."], 
        [new TalkChoiceAction(1,"Touch the statue"),
        new  TalkChoiceAction(8,"Ask a Question"),
    ]);
        
 
    }

  
}