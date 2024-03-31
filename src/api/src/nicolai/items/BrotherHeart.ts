import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { PlayerSession } from "../../types";

export const BrotherHeartAlias: string = "Heart";
export class BrotherHeart extends Item implements Examine, Pickup{
    public constructor(){
        super(BrotherHeartAlias, ExamineActionAlias, PickupActionAlias);
    }
public examine(): ActionResult | undefined {
    return new TextActionResult(["Its an red glowing orb it looks like the heart the statue told you about"]);
}
 public name(): string {
    return "Heart";
}
public pickup(): ActionResult | undefined {
    const PlayerSession: PlayerSession = getPlayerSession();
    
    if (!PlayerSession.inventory.includes(BrotherHeartAlias)){
        PlayerSession.inventory.push(BrotherHeartAlias);
    }
    else return new TextActionResult(["You already have this item"]);
    return new TextActionResult(["You picked up the heart"]);
    
}
}