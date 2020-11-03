import {BaseInput} from "./base-input";
import {ControlPrefix} from "../control";

export class Text extends BaseInput<string> {
	constructor() {
		super();
		this.initHTMLElementAttributes();
	}

	protected initHTMLElementAttributes(): void {
		this.type = "text";
	}
	getValue(): string {
		return this.value;
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-text", Text, {extends: "input"});
	}
}

Text.register();
