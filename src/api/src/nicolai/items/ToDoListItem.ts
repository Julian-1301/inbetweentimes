import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { PlayerSession } from "../../types";


export const ToDoListItemAlias: string = "To-do list";
export class ToDoListItem extends Item implements Examine, Pickup{
    public constructor(){
        super(ToDoListItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public examine(): ActionResult | undefined {
            return new TextActionResult(["Its a <blue>To-do list</blue> from one of the <blue>Cult Followers</blue>..", "On the <blue>To-do list</blue> are a few check offs","* Finish the <blue>Puzzles</blue>.", "* Grab the last <blue>Artifact</blue>.", "* Finish the <blue>Ritual</blue>."]);
    }

    public name(): string {
        return "To-do list";
    }
 
    public pickup(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();
        
        if (!PlayerSession.inventory.includes(ToDoListItemAlias)){
            PlayerSession.inventory.push(ToDoListItemAlias);
        }
        else return new TextActionResult(["You already picked it up."]);
        return new TextActionResult(["You pick up the <blue>To do list</blue> from the floor."]) ;
      }

}