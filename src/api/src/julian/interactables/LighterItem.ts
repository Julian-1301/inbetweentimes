import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { SolveChoiceAction } from "../actions/SolveAction";
import { PyramidRoomAlias } from "../rooms/PyramidRoom";

export const LighterItemAlias: string = "lighter";

export class LighterItem extends Interactable implements Examine, Pickup {
  
    public constructor() {
        super(LighterItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Lighter";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpLighter) {
            return new TextActionResult([""]);
        } else {
            return new TextActionResult([""]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpLighter) {
            playerSession.pickedUpLighter = true;
            playerSession.inventory.push(LighterItemAlias);

            return new TextActionResult(["You pick up the <blue>Lighter</blue>"]);
        }
        else {
            return new TextActionResult(["You already picked up the <blue>Lighter</blue>"]);
        } 
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        const options: any[] = [new SolveChoiceAction(11, "Cancel")];

        if (playerSession.torchesLit[0] === 0) {
            options.push(new SolveChoiceAction(1, "Light 1"));
        } else {
            options.push(new SolveChoiceAction(2, "Unlight 1"));
        }

        if (playerSession.torchesLit[1] === 0) {
            options.push(new SolveChoiceAction(3, "Light 2"));
        } else {
            options.push(new SolveChoiceAction(4, "Unlight 2"));
        }

        if (playerSession.torchesLit[2] === 0) {
            options.push(new SolveChoiceAction(5, "Light 3"));
        } else {
            options.push(new SolveChoiceAction(6, "Unlight 3"));
        }

        if (playerSession.torchesLit[3] === 0) {
            options.push(new SolveChoiceAction(7, "Light 4"));
        } else {
            options.push(new SolveChoiceAction(8, "Unlight 4"));
        }

        if (playerSession.torchesLit[4] === 0) {
            options.push(new SolveChoiceAction(9, "Light 5"));
        } else {
            options.push(new SolveChoiceAction(10, "Unlight 5"));
        }

        switch(choiceId) {
            case 1:
                playerSession.torchesLit[0] = 1;
                return new TextActionResult(["You light the <blue>Torch</blue>"]);
            case 2:
                playerSession.torchesLit[0] = 0;
                return new TextActionResult(["you unlight the <blue>Torch</blue>"]);
            case 3:
                playerSession.torchesLit[1] = 1;
                return new TextActionResult(["You light the <blue>Torch</blue>"]);
            case 4:
                playerSession.torchesLit[1] = 0;
                return new TextActionResult(["you unlight the <blue>Torch</blue>"]);
            case 5:
                playerSession.torchesLit[2] = 1;
                return new TextActionResult(["You light the <blue>Torch</blue>"]);
            case 6:
                playerSession.torchesLit[2] = 0;
                return new TextActionResult(["you unlight the <blue>Torch</blue>"]);
            case 7:
                playerSession.torchesLit[3] = 1;
                return new TextActionResult(["You light the <blue>Torch</blue>"]);
            case 8:
                playerSession.torchesLit[3] = 0;
                return new TextActionResult(["you unlight the <blue>Torch</blue>"]);
            case 9:
                playerSession.torchesLit[4] = 1;
                    return new TextActionResult(["You light the <blue>Torch</blue>"]);
            case 10:
                playerSession.torchesLit[4] = 0;
                    return new TextActionResult(["you unlight the <blue>Torch</blue>"]);
            case 11:
                return new TextActionResult(["You decide to leave the <blue>Torches alone</blue>"]);
        }

        if (playerSession.currentRoom = PyramidRoomAlias) {
        return new SolveActionResult(this, ["Will you interact with any of the <blue>Torches</blue>?"], options);
        } else {
            return undefined;
        }
    }
}

          

