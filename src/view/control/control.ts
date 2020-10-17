export interface IControl {
	getHTMLElement(): HTMLElement;
}

export abstract class Control<T extends HTMLElement> implements IControl {
	protected htmlElement: T;
	protected classes: string[] = [];
	constructor() {
		this.htmlElement = this.createHTMLElement();
		this.initHTMLElementProperties();
	}
	protected initHTMLElementProperties(): void {
		this.initHTMLElementClasses();
	}
	protected initHTMLElementClasses(): void {
		if (this.classes.length === 0) {
			return;
		}
		this.classes.forEach(this.addClass, this);
	}
	protected abstract createHTMLElement(): T;
	public addClass(className: string): void {
		this.htmlElement.classList.add(className);
	}
	public getHTMLElement(): T {
		return this.htmlElement;
	}
}
