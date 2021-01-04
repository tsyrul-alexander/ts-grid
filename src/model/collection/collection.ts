import {Utilities} from "../../utilities";
import {Event, IEvent} from "../event/event";
import {BaseObject} from "../base-object";
export interface ICollection<T> {
	addedItem: IEvent<ICollection<T>, T>;
	removedItem: IEvent<ICollection<T>, T>;
	count: number;
	add(item: T): void;
	remove(item: T): void;
	toArray(): T[];
	clear();
	getItemByFn(fn: (value: T, index: number) => boolean): T | null;
	each(callbackfn: (value: T, index: number) => void, thisArg?: any): void;
	getByIndex(index: number): T | null;
}

export class Collection<T> extends BaseObject implements ICollection<T> {
	public get count(): number {
		return this.items.length;
	}
	public addedItem: IEvent<ICollection<T>, T> = new Event<ICollection<T>, T>();
	public removedItem: IEvent<ICollection<T>, T> = new Event<ICollection<T>, T>();
	items: T[] = [];
	constructor() {
		super();
	}

	public each(callbackfn: (value: T, index: number) => void, thisArg?: any): void {
		this.items.forEach(callbackfn, thisArg);
	}
	public add(item: T): void {
		this.items.push(item);
		this.addedItem.fire(this, item);
	}
	public addRange(items: T[]): void {
		items.forEach(item => {
			this.add(item);
		}, this);
	}
	public remove(item: T): void {
		Utilities.removeItem(this.items, item);
		this.removedItem.fire(this, item);
	}
	public toArray(): T[] {
		return this.items;
	}
	public clear(): void {
		this.items.forEach(item => {
			this.remove(item);
		}, this);
	}
	public getByIndex(index: number): T | null {
		return this.items[index] || null;
	}
	public getItemByFn(fn: (value: T, index: number) => boolean): T | null{
		return Utilities.getItemByFn(this.items, fn);
	}
}
