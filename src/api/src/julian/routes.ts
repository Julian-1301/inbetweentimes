import { ExampleAction, ExampleActionAlias } from "../actions/ExampleAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { PickupActionAlias, PickupAction } from "../base/actions/PickupAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";

export function handleRoutes(_Room: Room, alias: string, gameObjects: GameObject[]): ActionResult | undefined {
    
        switch (alias) {
            case ExampleActionAlias:
                return ExampleAction.handle(gameObjects[0]);
    
            case PickupActionAlias:
                return PickupAction.handle(gameObjects[0]);
        }
    }
