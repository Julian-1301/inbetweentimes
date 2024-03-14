import { SolveChoiceAction } from "../actions/SolveAction";
import { Puzzle } from "../gameObjects/Puzzle";
import { TextActionResult } from "./TextActionResult";

/**
 * Class used the represent the result of a Solve action
 */
export class SolveActionResult extends TextActionResult {
    private _puzzle: Puzzle;
    private _choices: SolveChoiceAction[];

    /**
     * Create a new instance of this action result
     *
     * @param puzzle Puzzle who is offering the choices
     * @param text Text to show alongside the choices
     * @param choices Choices available to the player
     */
    public constructor(puzzle: Puzzle, text: string[], choices: SolveChoiceAction[]) {
        super(text);

        this._puzzle = puzzle;
        this._choices = choices;
    }

    /**
     * Puzzle who is offering the choices
     */
    public get puzzle(): Puzzle {
        return this._puzzle;
    }

    /**
     * Choices available to the player
     */
    public get choices(): SolveChoiceAction[] {
        return this._choices;
    }
}
