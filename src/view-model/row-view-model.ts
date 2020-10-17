import {BaseViewModel} from "./base-view-model";
import {RowModel} from "../model/row-model";
import {Event, IEvent} from "../model/event/event";

export class RowViewModel extends BaseViewModel<RowModel> {
	public  propertyChanged: IEvent<string> = new Event<string>();
	get(propertyName: string): any {
		return this[propertyName];
	}
	set(propertyName: string, value: any): void {
		this[propertyName] = value;
	}
}
