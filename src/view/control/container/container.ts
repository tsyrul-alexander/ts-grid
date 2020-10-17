import {Control, IControl} from "../control";
import {ContainerItem} from "./container-item";

export class Container extends Control<HTMLDivElement> {
	protected content: IControl[] = [];

	protected initHTMLElementClasses(): void {
		this.classes.push("container");
		super.initHTMLElementClasses();
	}
	addItem(control: IControl): IControl {
		let itemContainer = this.createItemContainer(control);
		this.htmlElement.appendChild(itemContainer.getHTMLElement());
		return itemContainer;
	}
	createItemContainer(item: IControl): IControl {
		return new ContainerItem(item);
	}
	createHTMLElement(): HTMLDivElement {
		return <HTMLDivElement>(document.createElement("div"));
	}
}
