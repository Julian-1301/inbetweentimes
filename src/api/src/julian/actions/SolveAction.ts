import { ActionReference } from "@shared/types";
import { ActionResult } from "../../base/actionResults/ActionResult";
import { Puzzle } from "../../base/gameObjects/Puzzle";
import { Action } from "../../base/actions/Action";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";

/** Alias used to identity the Solve action and interface */
export const SolveActionAlias: string = "solve";

/**
 * Interface for GameObjects that need to support the Solve action
 */
export interface Solve {
    /**
     * Execute the Solve action
     *
     * @param choiceId ID of the specific choice take into consideration
     *
     * @returns Result of the Solve action
     */
    solve(choiceId?: number): ActionResult | undefined;
}

/**
 * Class used to represent the Solve action
 */
export class SolveAction extends Action {
    /**
     * Create a new instance of the Solve action
     */
    public constructor() {
        super(SolveActionAlias, "Solve", true);
    }

    /**
     * Handle the Solve action
     *
     * @param gameObject Reference to the GameObject on which the Solve action should be executed
     * @param choiceId ID of the specific choice to handle
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject, choiceId?: number): ActionResult | undefined {
        if (implementsInterface(gameObject, SolveActionAlias)) {
            return castTo<Solve>(gameObject).solve(choiceId);
        }

        return undefined;
    }
}

/**
 * Class used to present a dialogue choice
 *
 * @remarks This class does not extend `Action` since it's a subaction of Solve and works fundamentally different than normal actions
 */
export class SolveChoiceAction {
    private _id: number;
    private _text: string;

    /**
     * Create a new instance of a dialogue choice
     *
     * @param id ID of the choice
     * @param text Text of the choice
     */
    public constructor(id: number, text: string) {
        this._id = id;
        this._text = text;
    }

    /**
     * Convert this dialogue choice into a UI-specific object
     *
     * @param puzzle Puzzle who has to handle this dialogue choice
     *
     * @returns UI-specific object representing this dialogue choice
     */
    public toReference(puzzle: Puzzle): ActionReference {
        return {
            alias: `${SolveActionAlias}:${puzzle.alias}:${this._id}`,
            label: this._text,
            needsObject: false,
        };
    }
}
