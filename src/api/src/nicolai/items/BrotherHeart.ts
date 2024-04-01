import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const BrotherHeartAlias: string = "Heart";
export class BrotherHeart extends Item implements Examine {
    public constructor(){
        super(BrotherHeartAlias, ExamineActionAlias);
    }
public examine(): ActionResult | undefined {
    return new TextActionResult(["Its an red glowing orb it looks like the heart the statue told you about"]);
}
 public name(): string {
    return "Heart";
}
}