import {BaseInputControl} from "./base-input-control";
import {ControlPrefix} from "../control";

export class TextControl extends BaseInputControl<string> {
	constructor() {
		super();
		this.initHTMLElementAttributes();
	}

	protected initHTMLElementAttributes(): void {
		this.type = "text";
	}
	public connected() {
		super.connected();
		this.addEventListener('keyup', this.onKeyUpEvent);
	}
	public disconnected() {
		super.disconnected();
		this.removeEventListener('keyup', this.onKeyUpEvent);
	}
	public onKeyUpEvent() {
		this.onValueChanged();
	}
	public getValue(): string {
		return this.value;
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-text", TextControl, {extends: "input"});
	}
}

TextControl.register();
