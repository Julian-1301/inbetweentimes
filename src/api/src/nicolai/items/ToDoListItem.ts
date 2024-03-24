import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";




export const ToDoListItemAlias: string = "To-do list";
export class ToDoListItem extends Item implements Examine, Pickup{
    public constructor(){
        super(ToDoListItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public examine(): ActionResult | undefined {
            return new TextActionResult(["Its a To-do list from one of the cult followers..", "On the To-do list are a few check offs","* Finish the puzzles", "* Grab the last artifact", "* Finish the ritual"]);
    }

    public name(): string {
        return "To-do list";
    }
 
    public pickup(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();
        
        if (!PlayerSession.inventory.includes(ToDoListItemAlias)){
            PlayerSession.inventory.push(ToDoListItemAlias);
        }
        else return new TextActionResult(["You already picked it up"]);
        return new TextActionResult(["You pick up the To do list from the floor"]) ;
      }

}