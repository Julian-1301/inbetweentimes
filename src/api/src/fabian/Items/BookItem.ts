import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { DecryptionItemAlias } from "./DecryptionItem";

export const BookItemAlias: string = "Book";

export class BookItem extends Item implements Examine, Pickup {
    public constructor() {
        super(BookItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Book";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "When You examine the book you read: 'logbook'",
            "When you open the book you notice encrypted messages",
            "The encryptions state:",
            "August 1986",
            "7gg/AVWX3U3ql2LwhCEeAyAj0pUIhBQvFAdeKmf2rKpLKCbf0qzUWOIric1Tma8Up16f2ywt1O9woa6oWmSlEKaUYJ2USCCYomuu1MvsofR+xgr6PynmdqEsGKqA4q/xi3O0z6C473afnKBCEQ96ca/QmyWsrG+98hBWy/rpWSnVj7j+NvAZ9CT4mR1VYnIrVwP30o1sUyNbdXahOGnrA39HvQqZbCt32tkn2fvu4nl0g2IKOXPhFjRz+BuBs7BEbCVIhXDxqZmDjv5DGBs5nyhjW8Of4/YxLFRacylG8Ji2z3/RHL5f25AKf392Ni0Zmkw6BlM2Kxt/Tc77PYFMSwPzSRLNPE8hPEkat9lKpF03j3VeVNRWKKr5XuVig2gJbr3WPX2JBIh/VUCumceEyRzLl8VwnEvfBrpXRdaOTEg=",
        ]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpBook) {
            playerSession.pickedUpBook = true;
            playerSession.inventory.push(BookItemAlias);
            playerSession.inventory.push(DecryptionItemAlias);

            return new TextActionResult(["You pick up the Book and found a piece of paper with decryption keys sticking out"]);
        } else return new TextActionResult(["You already picked up the Book"]);
    }
}

// encryption 1 = Vladimir Lenin - August 1986
// encryption 2 = Joseph Stalin - September 1986
// encryption 3 = Yuri Andropov - October 1986
