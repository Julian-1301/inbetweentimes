import { Room } from "../base/gameObjects/Room";
import { ColdWarRoom, ColdWarRoomAlias } from "../fabian/rooms/ColdWarRoom";
import { HydraulicRoom, HydraulicRoomAlias } from "./rooms/HydraulicsRoom";
import { StarmapRoom, StarmapRoomAlias } from "./rooms/StarmapRoom";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {

        case ColdWarRoomAlias:
            return new ColdWarRoom();

        case HydraulicRoomAlias:
            return new HydraulicRoom();

        case StarmapRoomAlias:
            return new StarmapRoom();
    }
    return undefined;
}

/**
 * Get a list of room instances by their alias
 *
 * @param alias List room aliases
 *
 * @returns List of room instances
 */
export function getRoomByAliases(objectAliases?: string[]): Room[] {
    return objectAliases?.map((e) => getRoomByAlias(e)!).filter((e) => e) || [];
}