import {BaseModel} from "./base-model";

export class RowModel extends BaseModel {
	protected data: any;
	constructor(data: any) {
		super();
		this.data = data;
	}
	getColumns() {
		return Object.keys(this.data);
	}
	get(propertyName: string): any {
		return this.data[propertyName];
	}
	set(propertyName: string, value: any): void {
		if (this.data[propertyName] === value) {
			return;
		}
		this.data[propertyName] = value;
	}
}
