import {BaseInputControl} from "./base-input-control";
import {ControlPrefix} from "../control";

export class IntegerControl extends BaseInputControl<number> {
	constructor() {
		super();
		this.initHTMLElementAttributes();
	}
	protected initHTMLElementAttributes(): void {
		this.type = "number";
		this.step = String(1);
		this.pattern = "\\d*";
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-integer", IntegerControl, {extends: "input"});
	}
	public getValue(): number {
		return Number.parseInt(this.value);
	}
}
IntegerControl.register();
