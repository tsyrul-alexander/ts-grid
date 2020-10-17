import {Utilities} from "../../utilities";
import {Event, IEvent} from "../event/event";
import {BaseObject} from "../base-object";
export interface ICollection<T> {
	add(item: T): void;
	remove(item: T): void;
	toArray(): T[];
}

export class Collection<T> extends BaseObject implements ICollection<T> {
	public AddedItem: IEvent<T> = new Event<T>();
	public RemoveItem: IEvent<T> = new Event<T>();
	items: T[] = [];
	constructor() {
		super();
	}
	add(item: T): void {
		this.items.push(item);
		this.AddedItem.fire(item);
	}
	addRange(items: T[]): void {
		items.forEach(item => {
			this.add(item);
		}, this);
	}
	remove(item: T): void {
		Utilities.removeItem(this.items, item);
		this.RemoveItem.fire(item);
	}
	toArray(): T[] {
		return this.items;
	}
}
