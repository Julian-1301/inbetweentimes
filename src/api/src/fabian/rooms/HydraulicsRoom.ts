import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { PickupAction } from "../../julian/actions/PickupAction";
import { TabletItem } from "../../fabian/Items/TabletItem";
import { PlayerSession } from "../../types";
import { SolveAction } from "../../julian/actions/SolveAction";
import { HydraulicsPuzzle } from "../interactables/HydraulicsPuzzle";
import { HydraulicControlPanel } from "../interactables/Hydraulic control panel";
import { MuanualItem } from "../Items/ManualItem";
import { CustomAction } from "../../base/actions/CustomAction";
import { ColdWarRoomAlias } from "./ColdWarRoom";

export const HydraulicRoomAlias: string = "HydraulicRoom";

export class HydraulicRoom extends Room {
    public constructor() {
        super(HydraulicRoomAlias);
    }

    public name(): string {
        return "Hydraulic Control";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        const images: any = [];
        
        images.push("HydraulicsNoButton");

        if (playerSession.pickedUpButton && playerSession.usedButton) {
            images.push("Hydraulics");
        }
        return images;
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
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
        console.log(objects);

        if (!playerSession.hydraulicsPuzzleSolved && playerSession.pickedUpButton) {
            objects.push(new HydraulicsPuzzle());
        } else if (!playerSession.pickedUpTablet && playerSession.hydraulicsPuzzleSolved) {
            objects.push(new TabletItem());
        } else {
            objects.push(new HydraulicControlPanel());
        }

        if (playerSession.examinedHydraulics) {
            objects.push(new MuanualItem());
        }
        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "This the submarines hydraulics control panel."
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