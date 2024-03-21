import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { getPlayerSession } from "../../instances";
import { PlayerSession } from "../../types";
import { Interactable } from "../../base/gameObjects/Interactable";
import { SolveActionResult } from "../../base/actionResults/SolveActionResult";
import { SolveChoiceAction } from "../actions/SolveAction";
import { EgyptianRoom, EgyptianRoomAlias } from "../rooms/EgyptianRoom";
import { ColdWarRoom, ColdWarRoomAlias } from "../../fabian/rooms/ColdWarRoom";
import { Room } from "../../base/gameObjects/Room";
import { AztecRoom, AztecRoomAlias } from "../../nicolai/rooms/AztecRoom";
import { OfficeRoom, OfficeRoomAlias } from "../rooms/OfficeRoom";
import { OasisRoom, OasisRoomAlias } from "../rooms/OasisRoom";

export const WatchItemAlias: string = "watch";

export class WatchItem extends Interactable implements Examine, Pickup {
    public constructor() {
        super(WatchItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "TravelWatch";
    }

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.pickedUpWatch) {
            return new TextActionResult(["You look at your watch", "It has the power to move you through time and space"]);
        } else {
            return new TextActionResult(["You should grab your watch before you leave", "You can't go anywhere without it"]);
        }
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if (!playerSession.pickedUpWatch) {
            playerSession.pickedUpWatch = true;
            playerSession.inventory.push(WatchItemAlias);

            return new TextActionResult(["You pick up the watch"]);
        }
        else
        
        return new TextActionResult(["You already picked up the watch"]);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        let room: Room;
        const locations: any[] = [];

        if (getPlayerSession().pickedUpWatch) { 
            if (getPlayerSession().currentRoom === OfficeRoomAlias){
                locations.push(new SolveChoiceAction(2, "Egypt"));
                locations.push(new SolveChoiceAction(3, "Cold War"));
                locations.push(new SolveChoiceAction(4, "Aztec"));
            } else if (getPlayerSession().currentRoom === EgyptianRoomAlias){
                locations.push(new SolveChoiceAction(1, "Office"));
                locations.push(new SolveChoiceAction(11, "Oasis"));
                locations.push(new SolveChoiceAction(3, "Cold War")); 
            } else if (getPlayerSession().currentRoom === ColdWarRoomAlias){
                locations.push(new SolveChoiceAction(1, "Office"));
                locations.push(new SolveChoiceAction(2, "Egypt"));
            } else if (getPlayerSession().currentRoom === AztecRoomAlias){
                locations.push(new SolveChoiceAction(1, "Office"));
            } else if (getPlayerSession().currentRoom === OasisRoomAlias){
                locations.push(new SolveChoiceAction(1, "Office"));
                locations.push(new SolveChoiceAction(2, "Egypt"));
                locations.push(new SolveChoiceAction(3, "Cold War")); 
            } else {
                return undefined;
            }     
    
            switch(choiceId) {
                case 1:
                    room = new OfficeRoom();
                    getPlayerSession().currentRoom = room.alias;
                    return new TextActionResult(["You enter the office"]);
                case 2:
                    room = new EgyptianRoom();
                    getPlayerSession().currentRoom = room.alias;
                    return new TextActionResult(["You walk through the door and enter Ancient Egypt", "You see a strange figure in the distance"]);
                case 3:
                    room = new ColdWarRoom();
                    getPlayerSession().currentRoom = room.alias;
                    return new TextActionResult(["You step into the Cold War era room", "You feel a chill in the air"]);
                case 4:
                    room = new AztecRoom();
                    getPlayerSession().currentRoom = room.alias;
                    return new TextActionResult(["You enter the mysterious Aztec room", "You hear the sound of ancient rituals"]);
                case 11:
                    room = new OasisRoom();
                    getPlayerSession().currentRoom = room.alias;
                    return new TextActionResult([""]);
                }   
                return new SolveActionResult(this, ["Where do you want to go to?"], locations);
            } else {
                return new TextActionResult(["You can't use it without picking it up first"]);
            }
        }
    }    