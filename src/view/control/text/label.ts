import {Control} from "../control";

export class Label extends Control<HTMLLabelElement> {
	public get text(): string {
		return this.htmlElement.innerText;
	}
	public set text(value: string) {
		this.htmlElement.innerText = value;
	}

	protected initHTMLElementClasses(): void {
		this.addClass("label");
		super.initHTMLElementClasses();
	}

	constructor(value: string = null) {
		super();
		this.htmlElement = this.createHTMLElement();
		this.text = value;
	}
	createHTMLElement(): HTMLLabelElement {
		return <HTMLLabelElement>(document.createElement("label"));
	}
}
