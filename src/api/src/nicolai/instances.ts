import { Room } from "../base/gameObjects/Room";
import { AztecRoomAlias, AztecRoom } from "./rooms/AztecRoom";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {

        case AztecRoomAlias:
            return new AztecRoom();
    }

    return undefined;
}
