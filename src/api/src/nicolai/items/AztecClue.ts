import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { PlayerSession } from "../../types";


export const AztecClueAlias: string = "Aztec Clue";
export class AztecClue extends Item implements Examine, Pickup{
    public constructor(){
        super(AztecClueAlias, ExamineActionAlias, PickupActionAlias);
    }

    public examine(): ActionResult | undefined {
            return new TextActionResult(["Its a small paper from the aztec empire with a number on it.", "it looks like its the last number to the combination.","2"]);
    }

    public name(): string {
        return "Clue";
    }
 
    public pickup(): ActionResult | undefined {
        const PlayerSession: PlayerSession = getPlayerSession();
        
        if (!PlayerSession.inventory.includes(AztecClueAlias)){
            PlayerSession.inventory.push(AztecClueAlias);
        }
        else return new TextActionResult(["You already picked it up."]);
        return new TextActionResult(["You pick up the Clue from the floor."]) ;
      }
    }