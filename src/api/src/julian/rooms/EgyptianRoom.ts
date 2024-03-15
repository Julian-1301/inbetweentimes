import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { PickupAction } from "../../base/actions/PickupAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { ShadyFigureCharacter } from "../characters/ShadyFigureCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { ScrollItem } from "../items/ScrollItem";
import { PlayerSession } from "../../types";
import { OfficeRoom } from "./OfficeRoom";
import { SolveAction } from "../../base/actions/SolveAction";
import { OasisPuzzle } from "../puzzles/OasisPuzzle";
import { ButtonItem } from "../items/buttonItem";

export const EgyptianRoomAlias: string ="egyptian";

export class EgyptianRoom extends Room {
    public constructor() {
        super(EgyptianRoomAlias);
    }

    public name(): string {
        return "Ancient Egypt";
    }
    
    public images(): string[] {
        return ["egyptimage"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), 
            new TalkAction(), 
            new PickupAction(), 
            new SolveAction(),
            new CustomAction("goto-officeroom", "Go to Office", false)];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
        console.log(objects);

        if (!playerSession.pickedUpScroll) {
            objects.push(new ScrollItem());
        }

        objects.push(new ShadyFigureCharacter());

        if (!playerSession.oasisPuzzleSolved) {
            objects.push(new OasisPuzzle());
        } else {
            objects.push(new ButtonItem());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You walk through the door and enter Ancient Egypt","You see a strange figure in the distance"]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "goto-officeroom") {
            const room: OfficeRoom = new OfficeRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        
        return undefined;
    }
}