import { ActionResult } from "../../base/actionResults/ActionResult";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Interactable } from "../../base/gameObjects/Interactable";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { SolveChoiceAction } from "../actions/SolveAction";
import { LighterItemAlias } from "./LighterItem";


export const CrackedTileItemAlias: string = "crackedtile";

export class CrackedTileItem extends Interactable implements Examine {

    public constructor() {
        super(CrackedTileItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Cracked Tile";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpCup) {
            return new TextActionResult([""]);
        } else {
            return new TextActionResult([""]);
        }
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        
        function arraysEqual(a: number[], b: number[]): boolean {
            if (a === b) return true;
            if (a === null || b === null) return false;
            if (a.length !== b.length) return false;
        
            for (let i: any = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }
        
            return true;
        }
        
        switch(choiceId) {
            case 1:
                playerSession.crackedTileCount++;
                const countMessage: string = playerSession.crackedTileCount === 1 ? "time" : "times";
                return new SolveActionResult(this, [`You have pressed the <blue>Cracked Tile</blue> ${playerSession.crackedTileCount} ${countMessage}`, "Do you press it again?"], [
                    new SolveChoiceAction(1, "Yes"),
                    new SolveChoiceAction(2, "No"),
                ]);
            case 2:
                if (playerSession.crackedTileCount === 38 && playerSession.drygroundValue === 2 && arraysEqual(playerSession.torchesLit, [0,1,1,0,1])) {
                    playerSession.inventory = playerSession.inventory.filter(item => item !== LighterItemAlias);
                    playerSession.hierogliphPuzzleSolved = true;
                    return new TextActionResult(["It seems like you correctly solved this puzzle", "Your fingers hurt from pressing the <blue>Cracked Tile</blue> that many times and you drop your <blue>Lighter</blue>","You can hear a strange voice talking to you now", "Greetings mortal, answer my riddles if you seek to find the truth"]);
                } else {
                    playerSession.crackedTileCount = 0; 
                    return new TextActionResult(["You decide to leave the tile alone"]);
                }
        }
    
        if (playerSession.hierogliphPuzzleSolved === false) {
            return new SolveActionResult(this, ["You see a cracked tile. Do you press it?"], [
                new SolveChoiceAction(1, "Yes"),
                new SolveChoiceAction(2, "No"),
            ]);
        } else {
            return undefined;
        }
    }
}