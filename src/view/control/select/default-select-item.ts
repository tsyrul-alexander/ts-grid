import {SelectItem} from "./select-item";
import {ControlPrefix} from "../control";

export class DefaultSelectItem extends SelectItem {
	constructor() {
		super();
		this.initHTMLAttributes();
	}
	initHTMLAttributes() {
		this.hidden = true;
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-default-select-item", DefaultSelectItem, {extends: "option"});
	}
}

DefaultSelectItem.register();
