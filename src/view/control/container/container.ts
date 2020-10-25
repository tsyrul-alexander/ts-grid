import {ControlPrefix, IControl} from "../control";
import {HTMLControl} from "../html-control";
import {IItemsControl} from "../items-control";

export class Container extends HTMLControl(HTMLDivElement) implements IItemsControl, HTMLDivElement {
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
	public removeItem(control: IControl) {
		this.removeChild(control.getHTMLElement());
	}
	public clear(): void {
		this.textContent = '';
	}
	public addContainerItem(control: IControl): IItemsControl {
		let containerItem = this.createContainerItem(control);
		this.appendChild(containerItem.getHTMLElement());
		return containerItem;
	}
	public createContainerItem(item: IControl): IItemsControl {
		let containerItem = new Container();
		containerItem.addItem(item);
		return containerItem;
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-container", Container, {extends: "div"});
	}
}

Container.register();
