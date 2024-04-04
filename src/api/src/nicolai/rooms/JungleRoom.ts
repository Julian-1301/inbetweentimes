import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getPlayerSession, getGameObjectsFromInventory } from "../../instances";
import { PickupAction } from "../../julian/actions/PickupAction";
import { SolveAction } from "../../julian/actions/SolveAction";
import { PlayerSession } from "../../types";
import { JunglePuzzel } from "../interactables/JunglePuzzel";
import { SmallPaper } from "../items/SmallPaper";
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
<<<<<<< HEAD
        return[
            "Jungle_background"
        ];
=======
        return["Jungle_background"];
>>>>>>> e8bab0595bb83c8ee4ef9ac8e8d2e6aca62bf4f2
    }
    
    public sounds(): string[] {
        return ["jungleAmbient"];
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
            return new TextActionResult(["You walk back to <blue>The Temple</blue>."]);
        } else {
            return undefined;
        } 
    } 
}
