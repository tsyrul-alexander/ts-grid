import {Event, IEvent} from "../../../model/event/event";
import {HTMLControl} from "../html-control";
import {IValueControl} from "../value-control";
import {ControlPrefix} from "../control";

export class Label extends HTMLControl(HTMLLabelElement) implements IValueControl {
	public valueChanged: IEvent<IValueControl, any> = new Event<IValueControl, any>();
	isReadOnly: boolean;

	getValue(): string {
		return this.innerText;
	}
	setValue(value: string): void {
		this.innerText = value;
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-label", Label, {extends: "label"});
	}
}

Label.register();
