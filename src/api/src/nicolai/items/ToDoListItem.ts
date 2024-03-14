import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";


export const ToDoListItemAlias: string = "To-do list";
export class ToDoListItem extends Item implements Examine{
    public constructor(){
        super(ToDoListItemAlias, ExamineActionAlias);
    }
    public examine(): ActionResult | undefined {
            return new TextActionResult(["Its a To-do list from one of the cult followers..", "On the To-do list are a few check offs","Finish the puzzles", "Grab the last artifact", "Finish the ritual"]);
    }

    public name(): string {
        return "To-do list";
    }

}