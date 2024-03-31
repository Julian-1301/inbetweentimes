import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { PickupAction } from "../actions/PickupAction";
import { SolveAction } from "../actions/SolveAction";
import { AnubisStatueCharacter } from "../characters/AnubisStatueCharacter";
import { CrackedTileItem } from "../interactables/CrackedTileItem";
import { CupItem } from "../interactables/CupItem";
import { TorchesItem } from "../items/TorchesItem";
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
        const playerSession: PlayerSession = getPlayerSession();
        const images: any = [];
        images.push("PyramidBackground");

        if (playerSession.riddleValue === 1) {
            images.push("StatuePyramid");
        }

        if (!playerSession.pickedUpCup) {
            images.push("CupItem");
        }

        if (playerSession.torchesLit[0] === 1 ) {
            images.push("Torch1");
        }

        if (playerSession.torchesLit[1] === 1 ) {
            images.push("Torch2");
        }

        if (playerSession.torchesLit[2] === 1 ) {
            images.push("Torch3");
        }

        if (playerSession.torchesLit[3] === 1 ) {
            images.push("Torch4");
        }

        if (playerSession.torchesLit[4] === 1 ) {
            images.push("Torch5");
        }

        return images;
    }

    public actions(): Action[] {
        return [new ExamineAction(), 
            new TalkAction(),
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

        objects.push(new TorchesItem());
        objects.push(new CrackedTileItem());

        if (playerSession.riddleValue === 1) {
        objects.push(new AnubisStatueCharacter());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "goback") {
            getPlayerSession().currentRoom = EgyptianRoomAlias;
            return new TextActionResult(["You walk back to <blue>The Desert</blue>"]);
        } else {
            return undefined;
        }
    } 
}
    