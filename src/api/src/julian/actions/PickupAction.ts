import { ActionResult } from "../../base/actionResults/ActionResult";
import { GameObject } from "../../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../../base/helpers";
import { Action } from "../../base/actions/Action";

export const PickupActionAlias: string = "pickup";

export interface Pickup {
    pickup(): ActionResult | undefined;
}

export class PickupAction extends Action {
    public constructor() {
        super(PickupActionAlias, "Pick up", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, PickupActionAlias)) {
            return castTo<Pickup>(gameObject).pickup();
        }

        return undefined;
    }
    
}