import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room" ;
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { ToDoListItem } from "../items/ToDoListItem";
import { StatueCharacter } from "../characters/StatueCharacter";

export const AztecRoomAlias : string = "Aztec" ;

export class AztecRoom extends Room {

    public constructor() {
        super(AztecRoomAlias);
    }
    public name(): string {
       return "Aztec";
    }

    public images(): string []{ 
        return [
            "AztecImage"
        ];
    }

    public objects(): GameObject[] {
        return [this, new ToDoListItem(), new StatueCharacter];
    }
    public actions(): Action[]{
        return[new ExamineAction];
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You stand outside an ominous temple", "You have a gut feeling something isnt right...."]);
    } 
}