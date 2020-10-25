import {IControl} from "./control";

export interface IItemsControl extends IControl {
	addItem(control: IControl): IControl;
	removeItem(control: IControl): void;
	clear(): void;
}
