import {ControlPrefix, IControl} from "../control";
import {HTMLControl} from "../html-control";
import {IItemsControl} from "../items-control";

export class ContainerControl extends HTMLControl(HTMLDivElement) implements IItemsControl, HTMLDivElement {
	constructor() {
		super();
		this.initHTMLElementClasses();
	}
	protected initHTMLElementClasses(): void {
		this.addClass("container");
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

	public static register(): void {
		customElements.define(ControlPrefix + "-container", ContainerControl, {extends: "div"});
	}
}

ContainerControl.register();
