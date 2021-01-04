import {BaseInputControl} from "./base-input-control";
import {ControlPrefix} from "../control";

export class FloatControl extends BaseInputControl<number> {
	constructor() {
		super();
		this.initHTMLElementAttributes();
	}
	protected initHTMLElementAttributes(): void {
		super.initHTMLElementAttributes();
		this.type = "number";
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-float", FloatControl, {extends: "input"});
	}

	public getValue(): number {
		return this.valueAsNumber;
	}
}
FloatControl.register();
