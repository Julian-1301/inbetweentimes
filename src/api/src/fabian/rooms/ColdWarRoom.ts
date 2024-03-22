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
import { BookItem } from "../Items/BookItem";
import { DecryptionItem } from "../Items/DecryptionItem";
import { SolveAction } from "../../julian/actions/SolveAction";
import { HydraulicsPuzzle } from "../interactables/HydraulicsPuzzle";
import { LogbookPuzzle } from "../interactables/LogbookPuzzle";
import { Table } from "../interactables/Table";
import { Starmap } from "../interactables/Starmaps";
import { HydraulicControlPanel } from "../interactables/Hydraulic control panel";
import { MuanualItem } from "../Items/ManualItem";

export const ColdWarRoomAlias: string = "ColdWarRoom";

export class ColdWarRoom extends Room {
    public constructor() {
        super(ColdWarRoomAlias);
    }

    public name(): string {
        return "Cold War Room";
    }

    public images(): string[] {
        return ["ColdWarControlRoom"];
    }

    public sound(): string[] {
        return ["Submarineambient"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new SolveAction()
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
        console.log(objects);

        if (!playerSession.examinedTable) {
            objects.push(new Table());
        } else {
            objects.push(new BookItem());
        }

        if (!playerSession.hydraulicsPuzzleSolved && playerSession.pickedUpButton) {
            objects.push(new HydraulicsPuzzle());
        } else if (!playerSession.pickedUpTablet && playerSession.hydraulicsPuzzleSolved) {
            objects.push(new TabletItem());
        } else {
            objects.push(new HydraulicControlPanel());
        }

        if (!playerSession.LogbookPuzzleSolved && playerSession.pickedUpDecryption) {
            objects.push(new LogbookPuzzle());
        } else {
            ("");
        }

        if (playerSession.openedBook) {
            objects.push(new DecryptionItem());
        }

        if (playerSession.examinedHydraulics) {
            objects.push(new MuanualItem());
        }

        objects.push(new Starmap());
        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "As you enter the room, you notice you are surrounded by metal.",
            "Peering through a nearby window, you are met with the deep ocean depths.",
            "You realize you are in a submarine.",
            "You see a table with a book",
            "You see a hydraulics control panel",
            "You see starmaps pinned to the wall",
        ]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public solve(): ActionResult | undefined {
        return new TextActionResult([""]);
    }
}


// For Pick up action on room.
// If I get it working

// "You lift up the room and hold it over your head",
// "You think to yourself: 'How is this even possible?'",
// "At that exact moment your arms give in and your are squashed by the room",
// "GAME OVER"