import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine,  ExamineActionAlias } from "../../base/actions/ExamineAction";
import { SolveChoiceAction } from "../actions/SolveAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { PlayerSession } from "../../types";
import { GameOverRoom } from "../rooms/GameOverRoom";
import { getPlayerSession } from "../../instances";

export const OasisPuzzleAlias: string = "oasis";

export class OasisPuzzle extends Interactable implements Examine {
    public constructor() {
        super(OasisPuzzleAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Puzzle Box";
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        switch (choiceId) {
            case 0:
            case 1:
                return new SolveActionResult(this, ["Which button do you press second?"], 
                [
                new SolveChoiceAction(8, "Earth"),
                new SolveChoiceAction(8, "Fire"),
                new SolveChoiceAction(2, "Air"),
                new SolveChoiceAction(8, "water")
            ]);
            case 2:  
            return new SolveActionResult(this, ["Which button do you press third?"], 
                [
                new SolveChoiceAction(9, "Earth"),
                new SolveChoiceAction(9, "Fire"),
                new SolveChoiceAction(9, "Air"),
                new SolveChoiceAction(3, "water")
            ]);
            case 3:
            return new SolveActionResult(this, ["Which button do you press Fourth?"], 
                [
                new SolveChoiceAction(10, "Earth"),
                new SolveChoiceAction(4, "Fire"),
                new SolveChoiceAction(10, "Air"),
                new SolveChoiceAction(10, "water")
            ]); 
            case 4:
                playerSession.oasisPuzzleSolved = true;
                return new TextActionResult(["That seemed to work", "You hear the sound of a chest opening next to you", "There is a button inside of it", "Maybe you should pick it up"]);
            case 7:
                return new SolveActionResult(this, ["Which button do you press Second?"], 
                    [
                    new SolveChoiceAction(8, "Earth"),
                    new SolveChoiceAction(8, "Fire"),
                    new SolveChoiceAction(8, "Air"),
                    new SolveChoiceAction(8, "water")
                    ]); 
            case 8:
                return new SolveActionResult(this, ["Which button do you press Third?"], 
                    [
                    new SolveChoiceAction(9, "Earth"),
                    new SolveChoiceAction(9, "Fire"),
                    new SolveChoiceAction(9, "Air"),
                    new SolveChoiceAction(9, "water")
                    ]); 
            case 9:
                return new SolveActionResult(this, ["Which button do you press Fourth?"], 
                    [
                    new SolveChoiceAction(10, "Earth"),
                    new SolveChoiceAction(10, "Fire"),
                    new SolveChoiceAction(10, "Air"),
                    new SolveChoiceAction(10, "water")
                    ]); 
            case 10:  
                playerSession.currentRoom = new GameOverRoom().alias;
                return new TextActionResult(["You pressed the buttons in the incorrect order", "The floor starts sinking beneath you and you fall down on spikes", "Try again"]);
                
        }

        return new SolveActionResult(this, ["Which button do you press first?"], 
        [
        new SolveChoiceAction(1, "Earth"),
        new SolveChoiceAction(7, "Fire"),
        new SolveChoiceAction(7, "Air"),
        new SolveChoiceAction(7, "water")
    ]);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This seems like a complicated puzzle", "maybe i should gather some clues before i attempt this"]);
    }
}