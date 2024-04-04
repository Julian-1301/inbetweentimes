import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { PickupAction } from "../actions/PickupAction";
import { TalkAction } from "../../base/actions/TalkAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { ShadyFigureCharacter } from "../characters/ShadyFigureCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { ScrollItem } from "../items/ScrollItem";
import { PlayerSession } from "../../types";
import { SolveAction } from "../actions/SolveAction";
import { CustomAction } from "../../base/actions/CustomAction";
import { PyramidRoomAlias } from "./PyramidRoom";
import { OasisRoomAlias } from "./OasisRoom";
import { DrygroundItem } from "../interactables/DryGroundItem";
import { AnubisStatueCharacter } from "../characters/AnubisStatueCharacter";


export const EgyptianRoomAlias: string ="egyptian";

export class EgyptianRoom extends Room   {
    public constructor() {
        super(EgyptianRoomAlias);
    }

    public name(): string {
        return "Ancient Egypt";
    }

    public sounds(): string[] {
        return ["DesertSound"];
    }
    
    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        const images: any = [];
        
        images.push("EgyptBackground");

        if (!playerSession.pickedUpScroll) {
            images.push("ScrollImage");
        }

        if (playerSession.drygroundValue === 1) {
            images.push("DryPlantImage");
        }

        if (playerSession.drygroundValue === 2) {
            images.push("WetPlantImage");
        }

        if (playerSession.riddleValue >= 4) {
            images.push("StatueEgypt");
        }

        return images;
        
    }

    public actions(): Action[] {
        return [new ExamineAction(), 
            new TalkAction(), 
            new PickupAction(), 
            new SolveAction(),
            new CustomAction("goleft", "Go To Pyramid", false),
            new CustomAction("goright", "Go To Oasis", false),
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [...getGameObjectsFromInventory()];

        if (!playerSession.pickedUpScroll) {
            objects.push(new ScrollItem());
        }

        objects.push(new ShadyFigureCharacter());
        objects.push(new DrygroundItem());

        if (playerSession.riddleValue === 4) {
            objects.push(new AnubisStatueCharacter());
        }

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You enter <blue>Ancient Egypt</blue>", "You see a <blue>Shady Figure</blue> standing pretty close to the <blue>Pyramid</blue>", "You also spot a small <blue>Oasis</blue> in the distance"]);
    }
    
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "goleft") {
            getPlayerSession().currentRoom = PyramidRoomAlias;
            return new TextActionResult(["You walk towards <blue>The Pyramid</blue>"]);

        } else if (alias === "goright") { 
            getPlayerSession().currentRoom = OasisRoomAlias;
            return new TextActionResult(["You walk towards <blue>The Oasis</blue>"]);
        } return undefined;
    }
}