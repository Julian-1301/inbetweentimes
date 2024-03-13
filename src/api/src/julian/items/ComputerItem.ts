import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";


export const ComputerItemAlias: string = "computer";

export class ComputerItem extends Item implements Examine {
    public constructor() {
        super(ComputerItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Computer";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Your trusty old computer", "It looks like you have some mail", "You decide to read a particularly strange one titled 'the oasis'","It reads: Where breezes end, liquid beginnings follow"]);
    }

}