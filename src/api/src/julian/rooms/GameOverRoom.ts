import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Action } from "../../base/actions/Action";
import { CustomAction } from "../../base/actions/CustomAction";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room";
import { resetPlayerSession } from "../../instances";


export const GameOverRoomAlias: string = "gameover";

export class GameOverRoom extends Room {

    public constructor() {
        super(GameOverRoomAlias);
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["asda"]);
    }

    public name(): string {
        return "Game over";
    }

    public images(): string[] {
        const images: any = [];
        images.push("GameOverImage");
        return images;
    }

    public actions(): Action[] {
        return [new CustomAction("Reset", "Reset Game", false)];
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "Reset") {
            resetPlayerSession();
            return new TextActionResult(["You are in your <blue>Office</blue>.","Your <blue>Computer</blue> is on and your <blue>Travel-Watch</blue> is on your desk", "Your day has been quiet but now your <blue>Phone</blue> starts ringing", "You should pick up the <blue>Phone</blue>, It might be your <blue>Boss</blue>"]);
        } else {
            return undefined;
        }
    }
}