import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";

export const OfficeRoomAlias: string = "Office";

export class OfficeRoom extends Room {
    public constructor() {
        super(OfficeRoomAlias);
    }

    public name(): string {
        return "Office";
    }

    public images(): string[] {
        return ["OfficeRoom"];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["This is your office room.","You have spent a lot of time here."]);
    }
}