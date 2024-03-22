import { Room } from "../base/gameObjects/Room";
import { StartupRoom, StartupRoomAlias } from "../rooms/StartupRoom";
import { EgyptianRoomAlias, EgyptianRoom } from "./rooms/EgyptianRoom";
import { GameOverRoom, GameOverRoomAlias } from "./rooms/GameOverRoom";
import { OasisRoom, OasisRoomAlias } from "./rooms/OasisRoom";
import { OfficeRoomAlias, OfficeRoom } from "./rooms/OfficeRoom";
import { PyramidRoom, PyramidRoomAlias } from "./rooms/PyramidRoom";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {

        case StartupRoomAlias:
            return new StartupRoom();

        case EgyptianRoomAlias:
            return new EgyptianRoom();

        case OfficeRoomAlias:
            return new OfficeRoom();
            
        case OasisRoomAlias:
            return new OasisRoom();

        case GameOverRoomAlias:
            return new GameOverRoom();
            
        case PyramidRoomAlias:
            return new PyramidRoom();
    }

    return undefined;
}
