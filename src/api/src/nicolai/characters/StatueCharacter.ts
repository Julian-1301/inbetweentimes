import { ActionResult } from "../../base/actionResults/ActionResult";
import { Character } from "../../base/gameObjects/Character";

export const StatueCharacterAlias: string = "Statue";
export class StatueCharacter extends Character {
  
    public constructor() {
        super (StatueCharacterAlias);
    }

    public name(): string {
        return "statue";
    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return undefined;
    }
  
}