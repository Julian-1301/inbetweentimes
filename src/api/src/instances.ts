import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { ExampleCharacterAlias, ExampleCharacter } from "./characters/ExampleCharacter";
import { BookItemAlias, BookItem } from "./fabian/Items/BookItem";
import { DecryptionItemAlias, DecryptionItem } from "./fabian/Items/DecryptionItem";
import { ManualItemAlias, ManualItem } from "./fabian/Items/ManualItem";
import { TabletItemAlias, TabletItem } from "./fabian/Items/TabletItem";
import { HydraulicControlPanelAlias, HydraulicControlPanel } from "./fabian/interactables/Hydraulic control panel";
import { HydraulicsPuzzleAlias, HydraulicsPuzzle } from "./fabian/interactables/HydraulicsPuzzle";
import { LogbookPuzzleAlias, LogbookPuzzle } from "./fabian/interactables/LogbookPuzzle";
import { StarmapAlias, Starmap } from "./fabian/interactables/Starmaps";
import { TableAlias, Table } from "./fabian/interactables/Table";
import { ExampleItemAlias, ExampleItem } from "./items/ExampleItem";
import { AnubisStatueCharacterAlias, AnubisStatueCharacter } from "./julian/characters/AnubisStatueCharacter";
import { ShadyFigureCharacterAlias, ShadyFigureCharacter } from "./julian/characters/ShadyFigureCharacter";
import { ComputerItemAlias, ComputerItem } from "./julian/interactables/ComputerItem";
import { CrackedTileItemAlias, CrackedTileItem } from "./julian/interactables/CrackedTileItem";
import { CupItemAlias, CupItem } from "./julian/interactables/CupItem";
import { FilledCupItemAlias, FilledCupItem } from "./julian/interactables/FilledCupItem";
import { LighterItemAlias, LighterItem } from "./julian/interactables/LighterItem";
import { OasisPuzzleAlias, OasisPuzzle } from "./julian/interactables/OasisPuzzle";
import { PhoneItemAlias, PhoneItem } from "./julian/interactables/PhoneItem";
import { PlantItemAlias, PlantItem } from "./julian/interactables/PlantItem";
import { WatchItemAlias, WatchItem } from "./julian/interactables/WatchItem";
import { GoldenScarabItemAlias, GoldenScarabItem } from "./julian/items/GoldenScarabItem";
import { NotebookItemAlias, NotebookItem } from "./julian/items/NotebookItem";
import { ScrollItemAlias, ScrollItem } from "./julian/items/ScrollItem";
import { TorchesItemAlias, TorchesItem } from "./julian/items/TorchesItem";
import { ButtonItemAlias, ButtonItem } from "./julian/items/buttonItem";
import { BrotherCharacterAlias, BrotherCharacter } from "./nicolai/characters/BrotherCharacter";
import { StatueCharacterAlias, StatueCharacter } from "./nicolai/characters/StatueCharacter";
import { JunglePuzzelalias, JunglePuzzel } from "./nicolai/interactables/JunglePuzzel";
import { PickaxeAlias, Pickaxe } from "./nicolai/interactables/PickAxeItem";
import { BrotherHeartAlias, BrotherHeart } from "./nicolai/items/BrotherHeart";
import { RockItemAlias, Rock } from "./nicolai/items/RockItem";
import { SmallPaperAlias, SmallPaper } from "./nicolai/items/SmallPaper";
import { ToDoListItemAlias, ToDoListItem } from "./nicolai/items/ToDoListItem";
import { PlayerSession } from "./types";
import { getRoomByAlias as getRoomByAliasJulian } from "./julian/instances";
import { getRoomByAlias as getRoomByAliasNicolai } from "./nicolai/instances";
import { getRoomByAlias as getRoomByAliasFabian } from "./fabian/instances";
import { NuclearControl, NuclearControlAlias } from "./fabian/interactables/nuclearControl";
import { AztecClue, AztecClueAlias } from "./nicolai/items/AztecClue";
import { DrygroundItemAlias, DrygroundItem } from "./julian/interactables/DryGroundItem";
import { FinalDoor, FinalDoorAlias } from "./nicolai/interactables/TheFinalDoor";


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
        pickedUpPlant: false,
        pickedUpCup: false,
        pickedUpFilledCup: false,
        pickedUpLighter: false,
        pickedupGoldenScarab: false,
        deletedBrowser: false,
        deletedPictures: false,
        deletedScript: false,
        callNumber: 0,
        drygroundValue: 0,
        torchesLit: [0, 0, 0, 0, 0],
        crackedTileCount: 0,
        aztecTalkValue: 0,
        pickedUpPickaxe:false,
        rockBroken:false,
        pickedUpBrotherHeart:false,
        junglePuzzleSolved: false,
        pickedUpSmallPaper: false,
        usedButton: false,
        hierogliphPuzzleSolved: false,
        currentWord: "",
        riddleValue: 1,
        oasisPuzzleHints: [0, 0, 0, 0],
        coldWarSolved: false,
        examinedNuclear: false,
        logPuzzleTried: false,
        AztecClue: false,
        TheFinalDoor: false,
        FinalDoorCode: "",       
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
            
        case BrotherCharacterAlias:
            return new BrotherCharacter();

        case TableAlias:
            return new Table();

        case StarmapAlias:
            return new Starmap();

        case HydraulicControlPanelAlias:
            return new HydraulicControlPanel();

        case ManualItemAlias:
            return new ManualItem();

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

        case BrotherCharacterAlias:
            return new BrotherCharacter();

        case BrotherHeartAlias:
            return new BrotherHeart();

        case PickaxeAlias:
            return new Pickaxe();

        case RockItemAlias:
            return new Rock();
        
        case TorchesItemAlias:
            return new TorchesItem();

        case LighterItemAlias:
            return new LighterItem();

        case CrackedTileItemAlias:
            return new CrackedTileItem();
        
        case JunglePuzzelalias:
            return new JunglePuzzel();
        
        case SmallPaperAlias:
            return new SmallPaper();

        case HydraulicsPuzzleAlias:
            return new HydraulicsPuzzle();

        case LogbookPuzzleAlias:
            return new LogbookPuzzle();

        case AnubisStatueCharacterAlias:
            return new AnubisStatueCharacter();

        case NotebookItemAlias:
            return new NotebookItem();

        case GoldenScarabItemAlias:
            return new GoldenScarabItem();

        case NuclearControlAlias:
            return new NuclearControl();
        
        case AztecClueAlias:
            return new AztecClue();
        case FinalDoorAlias:
            return new FinalDoor();

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
