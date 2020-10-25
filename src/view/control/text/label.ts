import {Event, IEvent} from "../../../model/event/event";
import {HTMLControl, IHtmlControl} from "../html-control";
import {IValueControl} from "../value-control";
import {ControlPrefix} from "../control";

export class Label extends HTMLControl(HTMLLabelElement) implements IHtmlControl {
	public valueChanged: IEvent<IValueControl, any> = new Event<IValueControl, any>();
	public static register(): void {
		customElements.define(ControlPrefix + "-label", Label, {extends: "label"});
	}
	getValue(): string {
		return this.innerText;
	}
	setValue(value: string): void {
		this.innerText = value;
	}
}

Label.register();
