export interface IEvent<T> {
	on(handler: { (data?: T): void }): void;
	un(handler: { (data?: T): void }): void;
	fire(data?: T): void;
}

export class Event<T> implements IEvent<T> {
	private handlers: {(data?: T): void;}[] = [];
	public on(handler: {(data?: T): void}): void {
		this.handlers.push(handler);
	}

	public un(handler: {(data?: T): void}): void {
		this.handlers = this.handlers.filter(item => item !== handler);
	}

	public fire(data?: T) : void {
		this.handlers.forEach(h => h(data));
	}
}
