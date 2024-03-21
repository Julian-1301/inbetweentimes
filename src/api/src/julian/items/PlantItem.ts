import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const PlantItemAlias: string = "plant";

export class PlantItem extends Item implements Examine, Pickup {
    public constructor() {
        super(PlantItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Plant";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpPlant) {
            return new TextActionResult(["The plant is slowly dying","You should find a nice place to plant it and give it some water so it won't die"]);
        } else {
            return new TextActionResult(["You look at the random plant in the corner", "This never seemed like the right place for plants"]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpPlant) {
            playerSession.pickedUpPlant = true;
            playerSession.inventory.push(PlantItemAlias);

            return new TextActionResult(["You pick up the plant"]);
        }
        else
        
        return new TextActionResult(["You already picked up the Plant"]);
    }

}