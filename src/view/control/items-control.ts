import {IControl} from "./control";

export interface IItemsControl extends IControl {
	getItems(): IControl[];
	addItem(control: IControl): IControl;
	addItems(control: IControl[]): void;
	removeItem(control: IControl): void;
	clear(): void;
}
