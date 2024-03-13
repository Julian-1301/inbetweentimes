import { Item } from "../../base/gameObjects/Item";


export const ToDoListItemsAlias: string = "To-do list";
export class ToDoListItems extends Item {
    public constructor(){
        super(ToDoListItemsAlias);
    }

    public name(): string {
        return "To-do list";
    }

}