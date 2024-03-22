import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { EgyptianRoomAlias } from "../rooms/EgyptianRoom";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { SolveChoiceAction } from "../actions/SolveAction";

export const PlantItemAlias: string = "plant";

export class PlantItem extends Interactable implements Examine, Pickup {
  
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
        else {
            return new TextActionResult(["You already picked up the Plant"]);
        } 
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.currentRoom === EgyptianRoomAlias){
            new SolveActionResult(this, ["Do you want to plant your sapling in the dry ground?"], [
                new SolveChoiceAction(1, "Yes"),
                new SolveChoiceAction(2, "No"),
            ]);
        }

        if (choiceId === 1) {
            playerSession.drygroundValue++;
            playerSession.inventory = playerSession.inventory.filter(item => item !== PlantItemAlias);
            return new TextActionResult(["You decide to plant your sapling into the ground", "It looks like it could use some water in this dryness"]);
        } else if (choiceId === 2) {
            return new TextActionResult(["You decide not to plant your sapling in the ground"]);
        } else {
            return undefined;
        }
    }
}



