import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { ExampleCharacter, ExampleCharacterAlias } from "./characters/ExampleCharacter";
import { ShadyFigureCharacter, ShadyFigureCharacterAlias } from "./julian/characters/ShadyFigureCharacter";
import { ExampleItem, ExampleItemAlias } from "./items/ExampleItem";
import { ScrollItem, ScrollItemAlias } from "./julian/items/ScrollItem";
import { ToDoListItem, ToDoListItemAlias } from "./nicolai/items/ToDoListItem";
import { PlayerSession } from "./types";
import { getRoomByAlias as getRoomByAliasJulian } from "./julian/instances";
import { getRoomByAlias as getRoomByAliasNicolai } from "./nicolai/instances";
import { getRoomByAlias as getRoomByAliasFabian } from "./fabian/instances";
<<<<<<< HEAD
import { StatueCharacter, StatueCharacterAlias } from "./nicolai/characters/StatueCharacter";
=======
import { ComputerItem, ComputerItemAlias } from "./julian/items/ComputerItem";
>>>>>>> c47123bd7ef87cf511d516c652f29e6a2da7a573

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
        pickedUpScroll: false,
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    let room: Room | undefined = getRoomByAliasJulian(alias);

    if (room) {
        return room;
    }

    room = getRoomByAliasNicolai(alias);

    if (room) {
        return room;
    }

    room = getRoomByAliasFabian(alias);

    if (room) {
        return room;
    }

    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    switch (alias) {
        case ExampleItemAlias:
            return new ExampleItem();

        case ExampleCharacterAlias:
            return new ExampleCharacter();

        case ScrollItemAlias:
            return new ScrollItem();

        case ShadyFigureCharacterAlias:
            return new ShadyFigureCharacter();
           
         case ToDoListItemAlias:
            return new ToDoListItem();

         case StatueCharacterAlias:
            return new StatueCharacter();
        

        case ComputerItemAlias:
            return new ComputerItem();

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);

    
}
