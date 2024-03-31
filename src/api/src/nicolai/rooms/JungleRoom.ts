import { ActionResult } from "../../base/actionResults/ActionResult";

import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession, getGameObjectsFromInventory } from "../../instances";
import { PlayerSession } from "../../types";
import { CustomAction } from "../../base/actions/CustomAction";

import { SolveAction } from "../../julian/actions/SolveAction";
import { PickupAction } from "../../julian/actions/PickupAction";
import { JunglePuzzel } from "../interactables/JunglePuzzel";
import { SmallPaper } from "../items/SmallPaper";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { AztecRoomAlias } from "./AztecRoom";



export const JungleRoomAlias: string ="Jungle";

export class JungleRoom extends Room   {
    public constructor() {
        super(JungleRoomAlias);
    }

    public name(): string {
        return "Jungle";
    }
    
    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        const images: any = [];
        
        if (playerSession.junglePuzzleSolved) {
            images.push("");
        } else {
        images.push("");
        }

        if (playerSession.junglePuzzleSolved && !playerSession.pickedUpSmallPaper) {
            images.push("");
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

        if (!playerSession.junglePuzzleSolved) {
            objects.push(new JunglePuzzel());
        } else if (!playerSession.pickedUpSmallPaper) {
            objects.push(new SmallPaper());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return undefined;
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "goback") {
            getPlayerSession().currentRoom = AztecRoomAlias;
            return new TextActionResult(["You walk back to <blue>The temple</blue>"]);
        } else {
            return undefined;
        } 
    } 
}
