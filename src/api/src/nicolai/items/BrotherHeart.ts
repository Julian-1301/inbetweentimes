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
    return new TextActionResult(["Its an <blue>Heart</blue> the one that old <blue>Statue</blue> told you about."]);
}
 public name(): string {
    return "Heart";
}
}