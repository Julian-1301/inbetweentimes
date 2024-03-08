import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room" ;

export const AztecRoomAlias : string = "Aztec" ;

export class AztecRoom extends Room {

    public constructor() {
        super(AztecRoomAlias);
    }
    public name(): string {
       return "Aztec";
    }

    public images(): string []{
        return [];
    }

    public objects(): GameObject[] {
        return [];
    }
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You enterted an ominous temple", "You have a gut feeling something isnt right...."]);
    } 
}