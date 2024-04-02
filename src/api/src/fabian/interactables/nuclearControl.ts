import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const NuclearControlAlias: string = "NuclearControl";

export class NuclearControl extends Item implements Examine {
    public constructor() {
        super(NuclearControlAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Nuclear Control panel";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.examinedNuclear) {
            playerSession.examinedNuclear = true;
            playerSession.coldWarSolved = true;
            return new TextActionResult([
                "When you examin the control panel you see that one of the launch keys is missing",
                "A shiver runs down you spine",
                "Why would someone need a key to such a destructive weapon",
                "I should contact my boss at once!"
            ]);
        } else return new TextActionResult (["I should go back to the <blue>office</blue> and call my <blue>boss</blue>"]);
    }
}
