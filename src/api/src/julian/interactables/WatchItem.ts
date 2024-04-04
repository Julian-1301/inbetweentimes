import { ActionResult } from "../../base/actionResults/ActionResult";
import { TextActionResult } from "../../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../../base/actions/ExamineAction";
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
import { OasisRoomAlias } from "../rooms/OasisRoom";
import { PyramidRoomAlias } from "../rooms/PyramidRoom";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { HydraulicRoomAlias } from "../../fabian/rooms/HydraulicsRoom";
import { StarmapRoomAlias } from "../../fabian/rooms/StarmapRoom";

export const WatchItemAlias: string = "watch";

export class WatchItem extends Interactable implements Examine, Pickup {
    
    public constructor() {
        super(WatchItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Travel-Watch";
    }

    public examine(): ActionResult | undefined {
            return new TextActionResult(["You look at your <blue>Watch</blue>.", "It has the power to move you through time and space."]);
    }

    public solve(choiceId?: number | undefined): ActionResult | undefined {
        let room: Room;
        const playerSession: PlayerSession = getPlayerSession();
        const locations: any[] = [new SolveChoiceAction(5, "Cancel")];
        const Egyptaliases: any[] = [OasisRoomAlias, PyramidRoomAlias, EgyptianRoomAlias];
        const coldWarAliases: any[] = [ColdWarRoomAlias, HydraulicRoomAlias, StarmapRoomAlias];

            if (playerSession.currentRoom === OfficeRoomAlias){
                locations.push(new SolveChoiceAction(2, "Egypt"));
                locations.push(new SolveChoiceAction(3, "Cold War"));
            } else if (Egyptaliases.includes(playerSession.currentRoom)){
                locations.push(new SolveChoiceAction(1, "Office"));
                locations.push(new SolveChoiceAction(3, "Cold War"));
            } else if (coldWarAliases.includes(playerSession.currentRoom)){
                locations.push(new SolveChoiceAction(1, "Office"));
                locations.push(new SolveChoiceAction(2, "Egypt")); 
            } else if (playerSession.currentRoom === AztecRoomAlias){
                locations.push(new SolveChoiceAction(1, "Office"));
                locations.push(new SolveChoiceAction(2, "Egypt")); 
                locations.push(new SolveChoiceAction(3, "Cold War"));

            } else {
                return undefined;
            }     

            // if (playerSession.callNumber === 3 && playerSession.currentRoom !== AztecRoomAlias) {
                locations.push(new SolveChoiceAction(4, "Aztec"));
            // }
    
            switch(choiceId) {
                case 1:
                    room = new OfficeRoom();
                    playerSession.currentRoom = room.alias;
                    return new TextActionResult(["You enter <blue>The Office</blue>."]);
                case 2:
                    room = new EgyptianRoom();
                    playerSession.currentRoom = room.alias;
                    return new TextActionResult(["You enter <blue>Ancient Egypt</blue>,", "You see a <blue>Shady Figure</blue> standing pretty close to the <blue>Pyramid</blue>.", "You also spot a small <blue>Oasis</blue> in the distance."]);
                case 3:
                    room = new ColdWarRoom();
                    playerSession.currentRoom = room.alias;
                    return new TextActionResult(["You step into the <blue>Cold War Submarine</blue>,", "You feel a chill in the air."]);
                case 4:
                    room = new AztecRoom();
                    playerSession.currentRoom = room.alias;
                    return new TextActionResult(["You enter the mysterious <blue> Aztec Temple</blue>,", "You hear the sound of ancient rituals."]);
                case 5:
                    return new TextActionResult(["You decide to stay"]);
                }   
                return new SolveActionResult(this, ["Where do you want to go to?"], locations);
            }

            public pickup(): ActionResult | undefined {
                return new TextActionResult(["You already picked up the <blue>Travel-Watch</blue>."]);
            }
        } 
