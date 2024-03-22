import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../../julian/actions/PickupAction";
import { Item } from "../../base/gameObjects/Item";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";

export const BookItemAlias: string = "Book";

export class BookItem extends Item implements Examine, Pickup {
    public constructor() {
        super(BookItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Logbook";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.pickedUpBook && !playerSession.openedBook) {
            playerSession.openedBook = true;

            return new TextActionResult([
                "When you examine the book you read: 'Logbook'",
                "As you open the book you notice a piece of paper falling out",
                "Perhaps I should pick it up",
            ]);
        } else if (
            playerSession.pickedUpBook &&
            playerSession.openedBook &&
            !playerSession.LogbookPuzzleSolved
        ) {
            return new TextActionResult([
                "Within the logbook you see three encrypted messages:",
                "",
                "ZWTfDqJIgy4bym1Zh9E", 
                "vJ27HYoFCM6Kwxy3cUhCK7JLVf1C5SCOh",
                "IwbV01J2zEdsYK1hMlUCnUpb2uMNxTCBTUeaH0jUVZHSSOakEjzDiS+YVf0PA1UCC1QuW+j02K7gIye78EaUWQrSt90xq8", 
                "79q+4+a15k5oOr4vSdVOSYt/x/m5qK2pmlM0IxESZ8d1WaC8h3NAMEs767IoC631T0coAzXMHhAweCycVVBsCSd/UBVFE",
                "7ODmsMRaPqMLpxPcWOr0ZAnNah0XeHXgtJtYSrtXolEHp7txgHzk/Xoc0RfnkB2U4cOnPsmMEiPzR7RTyVNmdNwleL1BJkinBISLZYg==",
                "",
                "lCAeWDqlp21irZah5pYR", 
                "JHJ7Z+xSOg6sNLTKzj4HcG0k+ihQsJYbtN", 
                "cjj5DuxEnJmiA92dgBEO3U09NB3sxS5YJxU3RtXFNuvLvS+hCbkAg5KKAwsffzAWYbYdonEyd7bn13+er0e8gZS2C2/mzHp1R", 
                "K08IOjr5OaYG/RDH8xGpsBgOCM1A5ChTr0dOTO8c9AA1ABVglZLvuLMmSyKWJCA74Ks8vV1YTMmG9qsIZxnqqAsElD0ZicilvAAW/Sa", 
                "5IrzjiOiP6kKC6skydGdx0fyiXmzD5WzCvSlI4Fg1w8ok=",
                "",
                "E+6QnEFT4SORGrSaWiF73", 
                "DKESZGNIv4UrkuMHDJLJZ9YI4uzH583Ma3t", 
                "IOps8ZGgG5YIQOIYKtRJBJEvF+d4FyPG2w5k1UOeKKJBAp6FJY", 
                "INohEmDXQnRx9/6WJBOKU5S8qS25XzDrQcQlZkF3c3B6/YHxEhku3EuvO7lhtdpx2mceT5HiGmctLZnc3tsu5H4OL087k3wDoiop57hSmku+k2kLfLX", 
                "PKGMXrI2LNEi2OzmhSQS2l2JYdHH78+hjjJOxatAPFMQsDjKz93LZAV+JgGgNzI2bMCUB2RUgNLufhlQBfthEhp29I/5fvvnMis"

            ]);
        } else if (
            playerSession.pickedUpBook &&
            playerSession.openedBook &&
            playerSession.LogbookPuzzleSolved
        ) {
            return new TextActionResult([
                "Within the logbook you see three encrypted messages:",
                "",
                "July 1986",
                "Atlantic ocean",
                "This month is like any other, monitoring sonar for enemy activity. No signs yet.",
                "Routine tasks keep us occupied. Taking breaks to eat and rest, staying vigilant.",
                "Another month of patrol in the Atlantic, mission continues.",
                "",
                "September 1986",
                "Atlantic ocean",
                "It's been 5 months since we left port.",
                "There has been a lot of tension between the crew as of late, nothing we aren't used to.",
                "although one of the maintance crew has been acting differntly...",
                "",
                "October 1986",
                "Atlantic ocean",
                "There is a fire in the missle silo",
                "And someone has sabotaged the hydraulics! We are heading straight to the coast of the USA...",
                "I should reset the hydraulics, there should be something in the manual."
            ]);
        } else {
            return new TextActionResult([
                "It's a brown soft cover book with the title: 'Logbook'",
                "Perhaps I should pick it up to investigate further",
            ]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpBook) {
            playerSession.pickedUpBook = true;

            return new TextActionResult(["You pick up the logbook"]);
        } else return new TextActionResult(["You already picked up the logbook"]);
    }
}
