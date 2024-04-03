import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { Pickup, PickupAction, PickupActionAlias } from "../../julian/actions/PickupAction";
import { PlayerSession } from "../../types";
import { BookItem } from "../Items/BookItem";
import { DecryptionItem } from "../Items/DecryptionItem";
import { SolveAction } from "../../julian/actions/SolveAction";
import { LogbookPuzzle } from "../interactables/LogbookPuzzle";
import { Table } from "../interactables/Table";
import { CustomAction } from "../../base/actions/CustomAction";
import { HydraulicRoomAlias } from "./HydraulicsRoom";
import { StarmapRoomAlias } from "./StarmapRoom";
import { GameOverRoom } from "../../julian/rooms/GameOverRoom";
import { NuclearControl } from "../interactables/nuclearControl";

export const ColdWarRoomAlias: string = "ColdWarRoom";

export class ColdWarRoom extends Room implements Pickup {
    public constructor() {
        super(ColdWarRoomAlias, PickupActionAlias);
    }

    public name(): string {
        return "Cold War Room";
    }

    public images(): string[] {
        return ["ColdWarControlRoom"];
    }

    public sounds(): string[] {
        return ["Submarineambient"];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new SolveAction(),
            new CustomAction("goleft", "Go Left", false),
            new CustomAction("goright", "Go Right", false),
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

        if (!playerSession.LogbookPuzzleSolved && playerSession.pickedUpDecryption) {
            objects.push(new LogbookPuzzle());
        }

        if (playerSession.openedBook) {
            objects.push(new DecryptionItem());
        }

        if (playerSession.LogbookPuzzleSolved && playerSession.hydraulicsPuzzleSolved) {
            objects.push(new NuclearControl());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "As you enter the room, you notice you are surrounded by metal.",
            "Peering through a nearby window, you are met with the deep ocean depths.",
            "You realize you are in a submarine.",
            "You see a <blue>table</blue> with a book",
            "You see a <blue>hydraulics</blue> control panel",
            "You see <blue>starmaps</blue> pinned to the wall",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        
        playerSession.currentRoom = new GameOverRoom().alias;
    
        return new TextActionResult([
            "You lift up the room and hold it over your head",
            "You think to yourself: 'How is this even possible?'",
            "At that exact moment your arms give in and your are squashed by the room",
        ]);
    }

    public solve(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (alias === "goleft" && !playerSession.hydraulicsPuzzleSolved) {
            getPlayerSession().currentRoom = HydraulicRoomAlias;
            return new TextActionResult(["You walk towards the <blue>hydraulics</blue> control panel"]);
        } else if (alias === "goleft" && playerSession.hydraulicsPuzzleSolved) {
            return new TextActionResult(["I don't need to be here anymore"]);
        } else if (alias === "goright" && !playerSession.LogbookPuzzleSolved) {
            getPlayerSession().currentRoom = StarmapRoomAlias;
            return new TextActionResult(["You walk towards the <blue>starmap</blue>"]);
        } else if (alias === "goright" && playerSession.LogbookPuzzleSolved) {
            return new TextActionResult(["I don't need to be here anymore"]);
        }
        return undefined;
    }
}

// For Pick up action on room.
// If I get it working
