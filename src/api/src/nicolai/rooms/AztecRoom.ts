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
import { getGameObjectsFromInventory, getPlayerSession } from "../../instances";
import { BrotherCharacter } from "../characters/BrotherCharacter";
import { PickupAction } from "../../julian/actions/PickupAction";
import { Pickaxe } from "../interactables/PickAxeItem";
import { SolveAction } from "../../julian/actions/SolveAction";
import { JungleRoomAlias } from "./JungleRoom";


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

        const objects: GameObject[] = [...getGameObjectsFromInventory()];
    
        if( playerSession.inventory.includes(ToDoListItemAlias)){
        objects.push(new ToDoListItem());
        }

        objects.push(new StatueCharacter()),
        objects.push(new BrotherCharacter()),
        objects.push(new Pickaxe());
      
        return objects ;
    }
    public actions(): Action[]{
        return[new ExamineAction(), 
            new TalkAction,
            new PickupAction(),
            new SolveAction(),
            new CustomAction("goto-JungleRoom", "Go To Jungle puzzel", false),];
    }   
    
    public examine(): ActionResult | undefined {
        return new TextActionResult(["You stand outside an ominous temple", "You have a gut feeling something isnt right...."]);
    } 

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "goto-JungleRoom") { 
            getPlayerSession().currentRoom = JungleRoomAlias;
            return new TextActionResult(["You walk towards <blue>The Jungle Puzzel</blue>"]);
        } return undefined;
        
        
    }
}
