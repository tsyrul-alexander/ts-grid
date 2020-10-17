import {Control, IControl} from "../control";

export class ContainerItem extends Control<HTMLDivElement> {
	constructor(public item: IControl) {
		super();
		this.htmlElement.appendChild(item.getHTMLElement());
	}

	protected initHTMLElementClasses(): void {
		this.classes.push("container-item");
		super.initHTMLElementClasses();
	}

	createHTMLElement(): HTMLDivElement {
		return <HTMLDivElement>(document.createElement("div"));
	}
}
