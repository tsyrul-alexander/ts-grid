import {ControlPrefix, IControl} from "../control";
import {HTMLControl} from "../html-control";
import {IItemsControl} from "../items-control";
import {Event, IEvent} from "../../../model/event/event";

export class Container extends HTMLControl(HTMLDivElement) implements IItemsControl, HTMLDivElement {
	public clickEvent: IEvent<Container, MouseEvent> = new Event();
	constructor() {
		super();
		this.initHTMLElementClasses();
	}
	protected initHTMLElementClasses(): void {
		this.addClass("container");
	}
	protected onClick(event: MouseEvent): void {
		this.clickEvent.fire(this, event);
	}
	public addItem(control: IControl): IControl {
		this.appendChild(control.getHTMLElement());
		return control;
	}
	public addItems(controls: IControl[]): void {
		let elements = controls.map(value => value.getHTMLElement());
		this.append(...elements);
	}
	public removeItem(control: IControl): void {
		this.removeChild(control.getHTMLElement());
	}
	public clear(): void {
		this.textContent = '';
	}
	public getItems(): IControl[] {
		let controls: IControl[] = [];
		for(let i = 0; i < this.children.length; i++) {
			let childItem = this.children.item(i);
			controls.push(<IControl><any>childItem);
		}
		return controls;
	}
	public connected() {
		super.connected();
		this.addEventListener("click", this.onClick);
	}
	public disconnected(): void {
		super.disconnected();
		this.removeEventListener("click", this.onClick);
	}

	public static register(): void {
		customElements.define(ControlPrefix + "-container", Container, {extends: "div"});
	}
}

Container.register();
