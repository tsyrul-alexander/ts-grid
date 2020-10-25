import {BaseViewModel} from "./base-view-model";
import {RowModel} from "../model/row-model";
import {Event, IEvent} from "../model/event/event";

export class RowViewModel extends BaseViewModel<RowModel> {
	public propertyChanged: IEvent<RowViewModel, string> = new Event<RowViewModel, string>();
	get(propertyName: string): any {
		return this.model.get(propertyName);
	}
	set(propertyName: string, value: any): void {
		if (this.model.get(propertyName) === value) {
			return;
		}
		this.model.set(propertyName, value);
		this.onPropertyChanged(propertyName);
	}
	onPropertyChanged(propertyName: string) {
		this.propertyChanged.fire(this, propertyName);
	}
}
