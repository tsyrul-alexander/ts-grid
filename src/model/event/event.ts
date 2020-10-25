export interface IEvent<TItem, TValue> {
	on(handler: {(item: TItem, data?: TValue): void}, scope: any): void;
	un(handler: {(item: TItem, data?: TValue): void}, scope: any): void;
	fire(item: TItem, data?: TValue): void;
}

export class Event<TItem, TValue> implements IEvent<TItem, TValue> {
	private handlers: {fn: (item: TItem, data?: TValue) => void, scope: any}[] = [];
	public on(handler: {(item: TItem, data?: TValue): void}, scope: any): void {
		this.handlers.push({
			fn: handler,
			scope: scope
		});
	}

	public un(handler: {(item: TItem, data?: TValue): void}, scope: any): void {
		this.handlers = this.handlers.filter(item => item.fn !== handler && item.scope != scope);
	}

	public fire(item: TItem, data?: TValue) : void {
		this.handlers.forEach(h => h.fn.call(h.scope, item, data));
	}
}
