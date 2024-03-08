import { ActionResult } from "../../base/actionResults/ActionResult";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";
import { Action } from "../../base/actions/Action";

/** Alias used to identity the travel action and interface */
export const TravelActionAlias: string = "travel";

/**
 * Interface for GameObjects that need to support a Travel action
 */
export interface Travel {
    /**
     * Execute a Travel action
     *
     * @returns Result of the Travel action
     */
    travel(): ActionResult | undefined;
}

/**
 * Class used to represent a Travel action
 */
export class TravelAction extends Action {
    /**
     * Create a new instance of the Travel action
     */
    public constructor() {
        super(TravelActionAlias, "Travel", true);
    }

    /**
     * Handle a Travel action
     *
     * @param roomAlias Reference to the room aliases on which the Travel action should be executed
     *
     * @returns Result of the action
     */
    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, TravelActionAlias)) {
            return castTo<Travel>(gameObject).travel();
        }

        return undefined;
    }
}
