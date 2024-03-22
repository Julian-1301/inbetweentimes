import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { getGameObjectsFromInventory, getPlayerSession, resetPlayerSession } from "../../instances";
import { PickupAction } from "../../julian/actions/PickupAction";
import { TabletItem } from "../../fabian/Items/TabletItem";
import { PlayerSession } from "../../types";
import { BookItem } from "../Items/BookItem";
import { OfficeRoom } from "../../julian/rooms/OfficeRoom";
import { CustomAction } from "../../base/actions/CustomAction";
import { DecryptionItem } from "../Items/DecryptionItem";

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

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new TalkAction(),
            new PickupAction(),
            new CustomAction("goto-officeroom", "Go to Office", false),
            new CustomAction("Reset", "Reset Game", false)
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];
        console.log(objects);

        if (!playerSession.pickedUpTablet) {
            objects.push(new TabletItem());
        }

        if (!playerSession.pickedUpBook) {
            objects.push(new BookItem());
        }

        if (!playerSession.pickedUpDecryption) {
            objects.push(new DecryptionItem());
        }
        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "As you enter the room, you notice you are surrounded by metal.",
            "Peering through a nearby window, you are met with the deep ocean depths.",
            "You realize you are in a submarine.",
        ]);
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult([""]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "goto-officeroom") {
            const room: OfficeRoom = new OfficeRoom();

            //Set the current room to the example room
            getPlayerSession().currentRoom = room.alias;

            return room.examine();
        }
        if (alias === "Reset") {
            resetPlayerSession();
        }

        return undefined;
    }

}
