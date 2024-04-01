import { ExampleAction, ExampleActionAlias } from "../actions/ExampleAction";
import { ActionResult } from "../base/actionResults/ActionResult";

import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { PickupActionAlias, PickupAction } from "../julian/actions/PickupAction";

export function handleRoutes(_Room: Room, alias: string, gameObjects: GameObject[]): ActionResult | undefined {
    
    switch (alias) {
        case ExampleActionAlias:
            return ExampleAction.handle(gameObjects[0]);

        case PickupActionAlias:
            return PickupAction.handle(gameObjects[0]); 
    }
    return undefined;
}
