import {BaseInput} from "./base-input";
import {ControlPrefix} from "../control";

export class Float extends BaseInput<number> {
	constructor() {
		super();
		this.initHTMLElementAttributes();
	}
	protected initHTMLElementAttributes(): void {
		this.type = "number";
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-float", Float, {extends: "input"});
	}

	getValue(): number {
		return Number.parseFloat(this.value);
	}
}
Float.register();
