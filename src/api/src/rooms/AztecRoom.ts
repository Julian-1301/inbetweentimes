import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room" ;

export const AztecroomAlias : string = "Aztec" ;

export class Aztecroom extends Room {

    public constructor() {
        super(AztecroomAlias);
    }
    public name(): string {
       return "Aztec";
    }
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You enterted an ominous temple", "You have a gut feeling something isnt right...."]);
    } 
}