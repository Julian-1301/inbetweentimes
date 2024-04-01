import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { SolveChoiceAction } from "../../julian/actions/SolveAction";
import { BrotherHeartAlias } from "../items/BrotherHeart";
import { GameOverRoom } from "../../julian/rooms/GameOverRoom";
import { AztecRoomAlias } from "../rooms/AztecRoom";

 
export const PickaxeAlias: string = "Pickaxe";
export class Pickaxe extends Interactable implements Examine, Pickup{
    public constructor(){
        super(PickaxeAlias, ExamineActionAlias, PickupActionAlias);
        }
    
        public solve(choiceId?: number | undefined): ActionResult | undefined {
            const playerSession: PlayerSession = getPlayerSession();
        
            switch(choiceId){ 
                case 1:
                    // Check if the player has the Pickaxe and is in the Aztec Room
                    if (playerSession.inventory.includes(PickaxeAlias) && playerSession.currentRoom === AztecRoomAlias) {
                        // Add BrotherHeart to inventory and remove Pickaxe
                        playerSession.inventory.push(BrotherHeartAlias);
                        playerSession.pickedUpBrotherHeart = true;
                        playerSession.inventory = playerSession.inventory.filter(item => item !== PickaxeAlias);
                        return new TextActionResult (["You broke the stone and got a glowing red orb"]);
                    } else {
                        // Return undefined if conditions are not met
                        return undefined;
                    }
                case 2: 
                    playerSession.currentRoom = new GameOverRoom().alias;
                    return new TextActionResult(["You smacked the statue and it got mad", "It let out an ancient roar and a rock fell on you", "You died because of this"]);
            }
        
            // If the choice is not 1 or 2, and the player has the Pickaxe in the Aztec Room, return SolveActionResult
            if (playerSession.inventory.includes(PickaxeAlias) && playerSession.currentRoom === AztecRoomAlias) {
                return new SolveActionResult(this, ["What do you want to use the <blue>Pickaxe</blue> for?"], [
                    new SolveChoiceAction(1, "Break rock"),
                    new SolveChoiceAction(2, "Smack statue"),
                    new SolveChoiceAction(3, "Cancel")
                ]);
            } else {
                // If the player doesn't have the Pickaxe or is not in the Aztec Room, return undefined
                return new TextActionResult(["You need to pick the <blue>Pickaxe</blue> up first"]);
            }
        }
            
    
public examine(): ActionResult | undefined {
    return new TextActionResult(["Its an iron pickaxe from the spanish invasion"]);
}

 public name(): string {
    return "Pickaxe";
}

public pickup(): ActionResult | undefined {

    const PlayerSession: PlayerSession = getPlayerSession();
    
    if (!PlayerSession.inventory.includes(PickaxeAlias)){
        PlayerSession.inventory.push(PickaxeAlias);
    }
    else return new TextActionResult(["You already picked it up"]);
    return new TextActionResult(["You pick up the Pickaxe from the statue's hands"]) ;
  }
}