import { ActionResult } from "../../base/actionResults/ActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";

export const DrygroundItemAlias: string = "dryground";

export class DrygroundItem extends Item implements Examine {
    public constructor() {
        super(DrygroundItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Dry Ground";
    }

    public examine(): ActionResult | undefined {
        return undefined;
    }
}