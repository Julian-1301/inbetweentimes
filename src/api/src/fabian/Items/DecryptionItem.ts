import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Item } from "../../base/gameObjects/Item";


export const DecryptionItemAlias: string = "Decryption";

export class DecryptionItem extends Item implements Examine {
    public constructor() {
        super(DecryptionItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Decryption";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "When You examine the Decryption paper you read:",
            "Vladimir Lenin - August 1986",
            "Joseph Stalin - September 1986",
            "Yuri Andropov - October 1986",
        ]);
    }
}

// encryption 1 = Vladimir Lenin - August 1986
// encryption 2 = Joseph Stalin - September 1986
// encryption 3 = Yuri Andropov - October 1986
