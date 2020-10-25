import {IEvent} from "../../model/event/event";
import {IControl} from "./control";

export interface IValueControl extends IControl {
	valueChanged: IEvent<IValueControl, any>;
	getValue(): any;
	setValue(value: any): void;
}
