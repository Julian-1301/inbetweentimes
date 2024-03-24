import { ActionResult } from "../../base/actionResults/ActionResult";
import { TalkActionResult } from "../../base/actionResults/TalkActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { TalkChoiceAction } from "../../base/actions/TalkAction";
import { Character } from "../../base/gameObjects/Character";

export const BrotherCharacterAlias:string = "Statue's Brother";

export class BrotherCharacter extends Character{
    public constructor(){
        super(BrotherCharacterAlias);
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
        if(choiceId === 1){
            return new TextActionResult(["This is just invading my privacy "]);
        }     
        if (choiceId === 2){
            return new TalkActionResult(this, ["You want my help?, Then you need to help me first"], 
            [
            new TalkChoiceAction(4, "How can i help you?"),
            new TalkChoiceAction(5, "No i dont feel like it")
       ]);}  
       if (choiceId === 4){
        return new TalkActionResult(this,["You need to find a new heart for me as you can see i have a hole in the middle of my chest, some spanish geezer stole my heart a long time ago"],
        [
            new TalkChoiceAction(5,"Ok il try my best"),
            new TalkChoiceAction(6,"I am short on time sorry")
        ]);}
        if(choiceId === 8){
            return new TalkActionResult(this, ["ugh is this really needed?"], 
            [
            new TalkChoiceAction(2, "I really need some answers of this palce"),
            new TalkChoiceAction(3, "If you dont want to talk then fine")
        ]);}
        
        return new TalkActionResult(this,["What you want little human?"],     
        [new TalkChoiceAction(1,"Touch the statue"),
        new  TalkChoiceAction(8,"Ask Question")]);   
    }
}
