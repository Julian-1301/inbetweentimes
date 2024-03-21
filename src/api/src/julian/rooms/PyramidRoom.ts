import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory } from "../../instances";
import { PickupAction } from "../actions/PickupAction";
import { SolveAction } from "../actions/SolveAction";


export const PyramidRoomAlias: string ="pyramid";

export class PyramidRoom extends Room   {
    public constructor() {
        super(PyramidRoomAlias);
    }

    public name(): string {
        return "Pyramid";
    }
    
    public images(): string[] {
        const images: any = [];

        return images;
    }

    public actions(): Action[] {
        return [new ExamineAction(), 
            new PickupAction(), 
            new SolveAction(),
        ];
    }

    public objects(): GameObject[] {

        const objects: GameObject[] = [...getGameObjectsFromInventory()];

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([""]);
    }
    
}