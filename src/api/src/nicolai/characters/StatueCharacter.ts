import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const StatueCharacterAlias: string = "Statue";
export class StatueCharacter extends Character implements Examine{
  
    public constructor() {
        super (StatueCharacterAlias, ExamineActionAlias);
    }
 
    public name(): string {
        return "statue";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Its an old stone statue..."]);
    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        if(_choiceId === 1){
            return new TextActionResult(["that is harrasment"]);
        }
        return new TalkActionResult(this,["Welcome to my home. I am a statue."], [ new TalkChoiceAction(1,"Touch the statue")]);
 
    }

  
}