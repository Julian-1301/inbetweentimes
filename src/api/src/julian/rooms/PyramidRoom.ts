import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { PickupAction } from "../actions/PickupAction";
import { SolveAction } from "../actions/SolveAction";
import { CupItem } from "../interactables/CupItem";
import { EgyptianRoomAlias } from "./EgyptianRoom";



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
            new CustomAction("goback", "Go Back", false),
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [...getGameObjectsFromInventory()];

        if (!playerSession.pickedUpCup) {
            objects.push(new CupItem());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "goback") {
            getPlayerSession().currentRoom = EgyptianRoomAlias;
        } else {
            return undefined;
        } return;
    } 
}
    