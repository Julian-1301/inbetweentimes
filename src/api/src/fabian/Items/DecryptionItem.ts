import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const DecryptionItemAlias: string = "Decryption";

export class DecryptionItem extends Item implements Examine, Pickup {
    public constructor() {
        super(DecryptionItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        const playerSession: PlayerSession = getPlayerSession();
        if (!playerSession.examinedDecryption) {
            return "Piece of paper";
        } else {
            return "Decryption keys";
        }
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpDecryption) {
            playerSession.examinedDecryption = true;
            return new TextActionResult([
                "When You examine the <blue>Piece of Paper</blue> you notice that the contents are <blue>Decryption Keys</blue>.",
                "You can distinguish the following keys:",
                "Lev Kamenev - January",
                "Joseph Stalin - February",
                "Grigory Zinoviev - March",
                "Lavrentiy Beria - April",
                "Georgy Malenkov - May",
                "Vyacheslav Molotov - June",
                "Leonid Brezhnev - July",
                "Alexei Kosygin - August",
                "Nikolai Podgorny - September",
                "Kostantin Chernenko - October",
                "Andrei Gromyko - November",
                "Dmitry Ustinov - December"
            ]);
        } else
            return new TextActionResult([
                "The <blue>Piece of Paper</blue> is laying on the floor,",
                "It's white and has some writings on it",
                "Perhaps I should pick it up so I can read it.",
            ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpBook && playerSession.openedBook && !playerSession.pickedUpDecryption) {
            playerSession.pickedUpDecryption = true;

            return new TextActionResult(["You pick up the <blue>Piece of Paper</blue>."]);
        } else if (playerSession.examinedDecryption) {
            return new TextActionResult(["You already picked up the <blue>Decryption Keys</blue>."]);
        } else return new TextActionResult(["You already picked up the <blue>Piece of Paper</blue>."]);
    }
}

// encryption 1 = Vladimir Lenin - August 1986
// encryption 2 = Joseph Stalin - September 1986
// encryption 3 = Yuri Andropov - October 1986
