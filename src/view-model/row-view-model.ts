import {BaseViewModel} from "./base-view-model";
import {RowModel} from "../model/row-model";
import {Event, IEvent} from "../model/event/event";
import {IListItem} from "../model/list-item";

export class RowViewModel extends BaseViewModel<RowModel> {
	public propertyChanged: IEvent<RowViewModel, string> = new Event<RowViewModel, string>();
	public static ListValuesPropertySuffix: string = "ListValues";
	public static ListValuesMethodSuffix: string = "LoadValues";
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
	getLookupValues(columnName: string, searchText: string): Promise<IListItem[]> {
		return new Promise<IListItem[]>((resolve, reject) => {
			if (this[columnName + RowViewModel.ListValuesMethodSuffix]) {
				this[columnName + RowViewModel.ListValuesMethodSuffix].apply(this, resolve, reject);
			} else {
				let filterLookupValues = this.getLookupListValues(columnName, searchText);
				resolve(filterLookupValues);
			}
		})
	}

	private getLookupListValues(columnName: string, searchText: string) {
		let lookupValues = <IListItem[]>this.get(columnName + RowViewModel.ListValuesPropertySuffix);
		return searchText && lookupValues.filter(lookupValue => {
			return lookupValue.displayValue.includes(searchText);
		}, this) || lookupValues;
	}

	onPropertyChanged(propertyName: string) {
		this.propertyChanged.fire(this, propertyName);
	}
}
