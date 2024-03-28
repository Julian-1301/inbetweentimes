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
import { StatueCharacter, StatueCharacterAlias } from "./nicolai/characters/StatueCharacter";
import { TabletItem, TabletItemAlias } from "./fabian/Items/TabletItem";
import { ComputerItem, ComputerItemAlias } from "./julian/interactables/ComputerItem";
import { OasisPuzzle, OasisPuzzleAlias } from "./julian/interactables/OasisPuzzle";
import { ButtonItemAlias, ButtonItem } from "./julian/items/buttonItem";
import { BookItem, BookItemAlias } from "./fabian/Items/BookItem";
import { DecryptionItem, DecryptionItemAlias } from "./fabian/Items/DecryptionItem";
import { Table, TableAlias } from "./fabian/interactables/Table";
import { Starmap, StarmapAlias } from "./fabian/interactables/Starmaps";
import {
    HydraulicControlPanel,
    HydraulicControlPanelAlias,
} from "./fabian/interactables/Hydraulic control panel";
import { MuanualItem, MuanualItemAlias } from "./fabian/Items/ManualItem";
import { WatchItem, WatchItemAlias } from "./julian/interactables/WatchItem";
import { PhoneItem, PhoneItemAlias } from "./julian/interactables/PhoneItem";
import { PlantItem, PlantItemAlias } from "./julian/interactables/PlantItem";
import { CupItemAlias, CupItem } from "./julian/interactables/CupItem";
import { FilledCupItem, FilledCupItemAlias } from "./julian/interactables/FilledCupItem";
import { DrygroundItem, DrygroundItemAlias } from "./julian/items/DryGroundItem";
import { TorchesItem, TorchesItemAlias } from "./julian/interactables/TorchesItem";
import { LighterItem, LighterItemAlias } from "./julian/interactables/LighterItem";
import { CrackedTileItem, CrackedTileItemAlias } from "./julian/interactables/CrackedTileItem";
import { HydraulicsPuzzle, HydraulicsPuzzleAlias } from "./fabian/interactables/HydraulicsPuzzle";
import { LogbookPuzzle, LogbookPuzzleAlias } from "./fabian/interactables/LogbookPuzzle";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "Office",
        inventory: [],
        pickedUpScroll: false,
        oasisPuzzleSolved: false,
        pickedUpButton: false,
        pickedUpTablet: false,
        pickedUpBook: false,
        openedBook: false,
        pickedUpDecryption: false,
        hydraulicsPuzzleSolved: false,
        LogbookPuzzleSolved: false,
        examinedTable: false,
        examinedDecryption: false,
        tablePickup: false,
        pickedUpManual: false,
        examinedHydraulics: false,
        pickedUpWatch: false,
        pickedUpPlant: false,
        pickedUpCup: false,
        pickedUpFilledCup: false,
        pickedUpLighter: false,
        deletedBrowser: false,
        deletedPictures: false,
        deletedScript: false,
        callNumber: 1,
        drygroundValue: 0,
        hydrogliphPuzzleValue: 0,
        torchesLit: [0, 0, 0, 0, 0],
        crackedTileCount: 0,
        usedButton: false,
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

        case OasisPuzzleAlias:
            return new OasisPuzzle();

        case ButtonItemAlias:
            return new ButtonItem();

        case TabletItemAlias:
            return new TabletItem();

        case BookItemAlias:
            return new BookItem();

        case DecryptionItemAlias:
            return new DecryptionItem();

        case TableAlias:
            return new Table();

        case StarmapAlias:
            return new Starmap();

        case HydraulicControlPanelAlias:
            return new HydraulicControlPanel();

        case MuanualItemAlias:
            return new MuanualItem();

        case WatchItemAlias:
            return new WatchItem();

        case PhoneItemAlias:
            return new PhoneItem();

        case PlantItemAlias:
            return new PlantItem();

        case CupItemAlias:
            return new CupItem();

        case FilledCupItemAlias:
            return new FilledCupItem();

        case DrygroundItemAlias:
            return new DrygroundItem();

        case TorchesItemAlias:
            return new TorchesItem();

        case LighterItemAlias:
            return new LighterItem();

        case CrackedTileItemAlias:
            return new CrackedTileItem();

        case HydraulicsPuzzleAlias:
            return new HydraulicsPuzzle();

        case LogbookPuzzleAlias:
            return new LogbookPuzzle();

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
