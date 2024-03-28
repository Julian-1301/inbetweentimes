import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { PickupAction } from "../../julian/actions/PickupAction";
import { SolveAction } from "../../julian/actions/SolveAction";
import { Starmap } from "../interactables/Starmaps";
import { CustomAction } from "../../base/actions/CustomAction";
import { ColdWarRoomAlias } from "./ColdWarRoom";

export const StarmapRoomAlias: string = "StarmapRoom";

export class StarmapRoom extends Room {
    public constructor() {
        super(StarmapRoomAlias);
    }

    public name(): string {
        return "Star map";
    }

    public images(): string[] {
        return ["Starmap"];
    }

    public sounds(): string[] {
        return ["Submarineambient"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new SolveAction(),
            new CustomAction("goback", "Go Back", false)
        ];
    }

    public objects(): GameObject[] {
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
        console.log(objects);

        objects.push(new Starmap());
        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This is the submarine's starmap"
        ]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public solve(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "goback") {
            getPlayerSession().currentRoom = ColdWarRoomAlias;
            return new TextActionResult(["You walk back"]);
        } else return undefined;
    } 
}


// For Pick up action on room.
// If I get it working

// "You lift up the room and hold it over your head",
// "You think to yourself: 'How is this even possible?'",
// "At that exact moment your arms give in and your are squashed by the room",
// "GAME OVER"