import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../base/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const TableAlias: string = "Table";

export class Table extends Item implements Examine, Pickup {
    public constructor() {
        super(TableAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Table";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.examinedTable = true;

        return new TextActionResult([
            "When You examine the table you see a lot of papers and books",
            "A book called 'Logbook' catches your eye",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.tablePickup) {
            playerSession.tablePickup = true;
            return new TextActionResult([
                "You pick up the tabel",
                "Whilst holding the table you realize this doen't make any sence",
                "You put the table back down",
            ]);
        } else return new TextActionResult(["There is no reason for me to pick up the table again"]);
    }
}

// encryption 1 = Vladimir Lenin - August 1986
// encryption 2 = Joseph Stalin - September 1986
// encryption 3 = Yuri Andropov - October 1986
