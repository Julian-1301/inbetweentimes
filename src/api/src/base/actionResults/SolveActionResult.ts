import { SolveChoiceAction } from "../../julian/actions/SolveAction";
import { Interactable } from "../gameObjects/Interactable";
import { TextActionResult } from "./TextActionResult";

/**
 * Class used the represent the result of a Solve action
 */
export class SolveActionResult extends TextActionResult {
    private _puzzle: Interactable;
    private _choices: SolveChoiceAction[];

    /**
     * Create a new instance of this action result
     *
     * @param puzzle Puzzle who is offering the choices
     * @param text Text to show alongside the choices
     * @param choices Choices available to the player
     */
    public constructor(puzzle: Interactable, text: string[], choices: SolveChoiceAction[]) {
        super(text);

        this._puzzle = puzzle;
        this._choices = choices;
    }

    /**
     * Puzzle who is offering the choices
     */
    public get puzzle(): Interactable {
        return this._puzzle;
    }

    /**
     * Choices available to the player
     */
    public get choices(): SolveChoiceAction[] {
        return this._choices;
    }
}
