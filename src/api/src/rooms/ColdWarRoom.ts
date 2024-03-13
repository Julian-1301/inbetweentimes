import { Example, ExampleAction } from "../actions/ExampleAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TravelAction } from "../base/actions/TravelAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { ExampleCharacter } from "../characters/ExampleCharacter";
import { getGameObjectsFromInventory } from "../instances";
import { ExampleItem } from "../items/ExampleItem";

export const ColdWarRoomAlias: string = "ColdWarRoom";

export class ColdWarRoom extends Room implements Example {
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
        return [new ExamineAction(), new TalkAction(), new ExampleAction(), new TravelAction()];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new ExampleItem(), new ExampleCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you enter the room, you are immediately awestruck by the intricate complexity of the metal behemoth surrounding you. It's a tubular control room, bathed in the dull glow of machinery, its walls adorned with a labyrinth of pipes and panels. Peering through a nearby window, you are met with the surreal sight of the deep ocean depths outside—realizing in an instant that you are submerged underwater. Examining the insignias adorning the interior, you discern unmistakable Soviet markings, indicating the vessel's origin. The revelation only deepens the mystery: why has this anomaly occurred within the confines of a Soviet submarine?"]);
    }

    public example(): ActionResult | undefined {
        return new TextActionResult(["This is an example action executed on a room."]);
    }

    public travel(): ActionResult | undefined {
        return new TextActionResult(["You traveled trough time"]);
    }
}