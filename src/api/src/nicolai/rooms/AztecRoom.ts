import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { GameObject } from "../../base/gameObjects/GameObject";
import { Room } from "../../base/gameObjects/Room" ;
import { Action } from "../../base/actions/Action";
import { ExamineAction } from "../../base/actions/ExamineAction";
import { ToDoListItem, ToDoListItemAlias } from "../items/ToDoListItem";
import { StatueCharacter } from "../characters/StatueCharacter";
import { TalkAction } from "../../base/actions/TalkAction";
import { CustomAction } from "../../base/actions/CustomAction";
import { getPlayerSession } from "../../instances";
import { OfficeRoom } from "../../julian/rooms/OfficeRoom";

import { BrotherCharacter } from "../characters/BrotherCharacter";
import { PickupAction } from "../../julian/actions/PickupAction";


import { Pickaxe } from "../interactables/PickAxeItem";
import { SolveAction } from "../../julian/actions/SolveAction";
import { BrotherHeart } from "../items/BrotherHeart";

export const AztecRoomAlias : string = "Aztec" ;
export class AztecRoom extends Room {

    public constructor() {
        super(AztecRoomAlias);
    }
    public name(): string {
       return "Aztec";
    }

    public images(): string []{ 
        return [
            "AztecImage"
        ];
    }

    public objects(): GameObject[] {
        type playerSession = any
        const playerSession: playerSession = getPlayerSession();

        const objects: GameObject[] = [this];
    
        if( playerSession.inventory.includes(ToDoListItemAlias)){
        objects.push(new ToDoListItem());
        }
      
        
        return [this, new ToDoListItem(), new StatueCharacter(), new BrotherCharacter(), new Pickaxe(),new BrotherHeart(), ];
    }
    public actions(): Action[]{
        return[new ExamineAction(), 
            new TalkAction,
            new PickupAction(),
            new CustomAction("goto-officeroom", "Go to Office", false),
            new CustomAction("goto-JungleRoom", "Go To Jungle puzzel", false),
            new SolveAction()];
    }   
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You stand outside an ominous temple", "You have a gut feeling something isnt right...."]);
    } 

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "goto-officeroom") {
            const room: OfficeRoom = new OfficeRoom();
            return room.examine();
        } else if (alias === "goto-JungleRoom") { 
            getPlayerSession().currentRoom = AztecRoomAlias;
            return new TextActionResult(["You walk towards <blue>The Oasis</blue>"]);
        } return undefined;
        
        
    }
}
