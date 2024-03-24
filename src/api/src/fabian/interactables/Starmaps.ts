import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";


export const StarmapAlias: string = "Starmap";

export class Starmap extends Item implements Examine {
    public constructor() {
        super(StarmapAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Starmap";
    }

    public images(): string[] {
        return ["Starmap"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "When You examine the starmap you see 3 constellations pricked on a board",
            "Perhaps I can use this?"
        ]);
    }
}

// encryption 1 = Vladimir Lenin - August 1986
// encryption 2 = Joseph Stalin - September 1986
// encryption 3 = Yuri Andropov - October 1986
