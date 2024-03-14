import { Room } from "../base/gameObjects/Room";
import { ColdWarRoom, ColdWarRoomAlias } from "../fabian/rooms/ColdWarRoom";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {

        case ColdWarRoomAlias:
            return new ColdWarRoom();
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