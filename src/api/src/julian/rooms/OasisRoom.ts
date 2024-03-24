import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession, getGameObjectsFromInventory } from "../../instances";
import { PlayerSession } from "../../types";
import { PickupAction } from "../actions/PickupAction";
import { SolveAction } from "../actions/SolveAction";
import { ButtonItem } from "../items/buttonItem";
import { OasisPuzzle } from "../interactables/OasisPuzzle";
import { CustomAction } from "../../base/actions/CustomAction";
import { EgyptianRoomAlias } from "./EgyptianRoom";



export const OasisRoomAlias: string ="oasis";

export class OasisRoom extends Room   {
    public constructor() {
        super(OasisRoomAlias);
    }

    public name(): string {
        return "Oasis";
    }
    
    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        const images: any = [];
        
        if (playerSession.oasisPuzzleSolved) {
            images.push("OasisBackgroundSolved");
        } else {
        images.push("OasisBackgroundUnsolved");
        }

        if (playerSession.oasisPuzzleSolved && !playerSession.pickedUpButton) {
            images.push("ButtonImage");
        }

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

        if (!playerSession.oasisPuzzleSolved) {
            objects.push(new OasisPuzzle());
        } else if (!playerSession.pickedUpButton) {
            objects.push(new ButtonItem());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return undefined;
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "goback") {
            getPlayerSession().currentRoom = EgyptianRoomAlias;
            return new TextActionResult(["You walk back to <blue>The Desert</blue>"]);
        } else {
            return undefined;
        } return;
    } 
}