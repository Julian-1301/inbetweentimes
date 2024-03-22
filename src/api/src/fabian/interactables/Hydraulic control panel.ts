import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";


export const HydraulicControlPanelAlias: string = "HydraulicControlPanel";

export class HydraulicControlPanel extends Item implements Examine {
    public constructor() {
        super(HydraulicControlPanelAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Hydraulics";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.examinedHydraulics = true;

        return new TextActionResult([
            "When You examine the Hydraulic Control Panel you see that it has been sabotaged",
            "The hydraulic valves are turned haphazardly",
            "There is a book named 'Manual'",
            "There is also a button missing, perhaps I can find it somewhere?"
        ]);
    }
}
