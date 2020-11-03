import {IEvent} from "../../model/event/event";
import {IControl} from "./control";

export interface IValueControl extends IControl {
	valueChanged: IEvent<IValueControl, any>;
	isReadOnly: boolean;
	getValue(): any;
	setValue(value: any): void;
}

export interface IValueControlT<T> extends IValueControl {
	valueChanged: IEvent<IValueControlT<T>, T>;
	getValue(): T;
	setValue(value: T): void;
}

export function searchControlValue<T>(controls: IValueControlT<T>[], value: T): IValueControlT<T> | null {
	let searchItem = null;
	controls.forEach(control => {
		if (!searchItem && control.getValue() === value) {
			searchItem = value;
		}
	}, this);
	return searchItem;
}
