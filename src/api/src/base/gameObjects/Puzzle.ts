import { ActionResult } from "../actionResults/ActionResult";
import { Solve, SolveActionAlias } from "../actions/SolveAction";
import { GameObject } from "./GameObject";

/**
 * Base class used to represent a puzzle
 *
 * @remarks Implements the Talk action by default
 */
export abstract class Puzzle extends GameObject implements Solve {
    /**
     * Create a new instance of this puzzle
     *
     * @param alias Alias of this puzzle
     * @param interfaces List of interfaces this puzzle implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        super(alias, ...interfaces, SolveActionAlias);
    }

    public abstract solve(choiceId?: number): ActionResult | undefined;
}
