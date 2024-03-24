import { ActionResult } from "../actionResults/ActionResult";
import { Solve, SolveActionAlias } from "../../julian/actions/SolveAction";
import { GameObject } from "./GameObject";

/**
 * Base class used to represent an interactable
 *
 * @remarks Implements the Solve action by default
 */
export abstract class Interactable extends GameObject implements Solve {
    /**
     * Create a new instance of this puzzle
     *
     * @param alias Alias of this interactable
     * @param interfaces List of interfaces this interactable implements
     */
    protected constructor(alias: string, ...interfaces: string[]) {
        super(alias, ...interfaces, SolveActionAlias);
    }

    public abstract solve(choiceId?: number): ActionResult | undefined;
}
