import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Item } from "../../base/gameObjects/Item";

export const TorchesItemAlias: string = "torches";

export class TorchesItem extends Item implements Examine {

    public constructor() {
        super(TorchesItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Torches";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.torchesLit.includes(0) && playerSession.torchesLit.includes(1)) {
            return new TextActionResult(["Some <blue>Torches</blue> are lit while some others are not."]);
        } else if (playerSession.torchesLit.includes(0))
            return new TextActionResult(["You see six unlit <blue>Torches</blue>,", "You might be able to light them if you have a <blue>Lighter</blue>."]);
        else {
            return new TextActionResult(["You see six lit <blue>Torches</blue>,", "It is a nice view to see the whole area lit up."]);
        }
    }
}