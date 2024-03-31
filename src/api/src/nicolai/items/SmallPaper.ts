import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { PlayerSession } from "../../types";


export const SmallPaperAlias: string = "Small paper";
export class SmallPaper extends Item implements Examine, Pickup{
    public constructor(){
        super(SmallPaperAlias, ExamineActionAlias, PickupActionAlias);
    }

    public examine(): ActionResult | undefined {
            return new TextActionResult(["Its a small paper with a number on it", "it looks like its the second number to the combination","9"]);
    }

    public name(): string {
        return "Small paper";
    }
 
    public pickup(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();
        
        if (!PlayerSession.inventory.includes(SmallPaperAlias)){
            PlayerSession.inventory.push(SmallPaperAlias);
        }
        else return new TextActionResult(["You already picked it up"]);
        return new TextActionResult(["You pick up the Small paper from the Rock"]) ;
      }

}