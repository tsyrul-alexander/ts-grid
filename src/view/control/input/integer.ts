import {BaseInput} from "./base-input";
import {ControlPrefix} from "../control";

export class Integer extends BaseInput<number> {
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
		customElements.define(ControlPrefix + "-integer", Integer, {extends: "input"});
	}

	getValue(): number {
		return Number.parseInt(this.value);
	}
}
Integer.register();
