import { Room } from "../base/gameObjects/Room";
import { AztecRoomAlias, AztecRoom } from "./rooms/AztecRoom";
import { JungleRoom, JungleRoomAlias } from "./rooms/JungleRoom";

export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {

        case AztecRoomAlias:
            return new AztecRoom();
        case JungleRoomAlias:
            return new JungleRoom();
    }

    return undefined;
}
