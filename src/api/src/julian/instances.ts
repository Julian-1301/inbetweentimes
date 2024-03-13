import { Room } from "../base/gameObjects/Room";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { EgyptianRoomAlias, EgyptianRoom } from "./rooms/EgyptianRoom";
import { OfficeRoomAlias, OfficeRoom } from "./rooms/OfficeRoom";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {

        case StartupRoomAlias:
            return new StartupRoom();

        case EgyptianRoomAlias:
            return new EgyptianRoom();

        case OfficeRoomAlias:
            return new OfficeRoom();
    }

    return undefined;
}
