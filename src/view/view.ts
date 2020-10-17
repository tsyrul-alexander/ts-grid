import {IControl} from "./control/control";

export interface IView {
	getControl(): IControl;
}
