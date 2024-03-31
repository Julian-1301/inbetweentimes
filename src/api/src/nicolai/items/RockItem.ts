
import { ActionResult } from "../../base/actionResults/ActionResult";

import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { PlayerSession } from "../../types";


export const RockItemAlias: string = "Rock";
export class Rock extends Item implements Examine, Pickup{
    public constructor(){
        super(RockItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Rock";
    }
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.aztecTalkValue > 2) {
            return new TextActionResult (["The Rock looks like it could be broken"]);
            
        } else {
            return new TextActionResult(["This is a sturdy rock"]);
        }
    }
    
    public pickup(): ActionResult | undefined {
        return new TextActionResult(["This is way too heavy for you. Try again and you'll probably die."]);
    }
    

    
}
 