import {Event, IEvent} from "../../../model/event/event";
import {HTMLControl} from "../html-control";
import {IValueControl} from "../value-control";
import {ControlPrefix} from "../control";

export class LabelControl extends HTMLControl(HTMLLabelElement) implements IValueControl {
	public valueChanged: IEvent<IValueControl, any> = new Event<IValueControl, any>();
	public isReadOnly: boolean;

	public getValue(): string {
		return this.innerText;
	}
	public setValue(value: string): void {
		this.innerText = value;
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-label", LabelControl, {extends: "label"});
	}
}

LabelControl.register();
