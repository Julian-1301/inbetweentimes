import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine,  ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { PlayerSession } from "../../types";
import { getPlayerSession } from "../../instances";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { SolveChoiceAction } from "../../julian/actions/SolveAction";
import { GameOverRoom } from "../../julian/rooms/GameOverRoom";
import { AztecClueAlias } from "../items/AztecClue";

export const JunglePuzzelalias: string = "Jungle";

export class JunglePuzzel extends Interactable implements Examine, Pickup {
    public constructor() {
        super(JunglePuzzelalias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Jungle Puzzel";
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        switch (choiceId) {
            case 0:
            case 1:
                return new SolveActionResult(this, ["What happend second?"], 
                [
                new SolveChoiceAction(2, "Aztec empire"),
                new SolveChoiceAction(5, "Egypt empire"),
                new SolveChoiceAction(5, "The Cold War"),
                
            ]);
            case 2:  
            return new SolveActionResult(this, ["What happend third?"], 
                [
                new SolveChoiceAction(6, "Aztec empire"),
                new SolveChoiceAction(6, "Egypt empire"),
                new SolveChoiceAction(3, "The Cold War"),
               
            ]);
            case 3:
                 {
                    // Add BrotherHeart to inventory and remove Pickaxe
                    playerSession.inventory.push(AztecClueAlias);
                    playerSession.AztecClue = true;
                    return new TextActionResult(["You solved the puzzle. A monkey came out of the tree and dropped a <blue>Paper</blue> near the <blue>Puzzle</blue>", "You picked it up"]);  
                }
                
            case 4:
                return new SolveActionResult(this, ["What happened Second?"], [
                    new SolveChoiceAction(5, "Aztec empire"),
                    new SolveChoiceAction(5, "Egypt empire"),
                    new SolveChoiceAction(5, "The Cold War")
                ]);
            
            case 5:
                return new SolveActionResult(this, ["What happend Third?"], 
                    [
                    new SolveChoiceAction(6, "Aztec empire"),
                    new SolveChoiceAction(6, "Egypt empire"),
                    new SolveChoiceAction(6, "The Cold War"),
        
                    ]); 
        
            case 6:  
                playerSession.currentRoom = new GameOverRoom().alias;
                return new TextActionResult(["A tiger saw you do it wrong and got mad and ate you", "Try again"]);
            case 7:
                return new TextActionResult(["Are you scared to try?", "Boring.. "]);
        }

        return new SolveActionResult(this, ["What happend first?"], 
        [
        new SolveChoiceAction(4, "Aztec empire"),
        new SolveChoiceAction(1, "Egypt empire"),
        new SolveChoiceAction(4, "The Cold War"),
        
        new SolveChoiceAction(7, "Cancel")
    ]);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Its seems that you need to put the events in the right order"]);
    }

    public pickup(): ActionResult | undefined {
        return undefined;
    }
    
}
    