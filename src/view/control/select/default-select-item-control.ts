import {SelectItemControl} from "./select-item-control";
import {ControlPrefix} from "../control";

export class DefaultSelectItemControl extends SelectItemControl {
	constructor() {
		super();
		this.initHTMLAttributes();
	}
	initHTMLAttributes() {
		this.hidden = true;
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-default-select-item", DefaultSelectItemControl, {extends: "option"});
	}
}

DefaultSelectItemControl.register();
