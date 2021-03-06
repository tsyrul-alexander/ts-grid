import {ControlPrefix} from "../control";
import {BaseDateControl} from "./base-date-control";

export class DateControl extends BaseDateControl {
	constructor() {
		super();
		this.initHTMLElementAttributes();
		this.initHTMLClasses();
	}
	protected initHTMLClasses() {
		super.initHTMLClasses();
		this.addClass("date-input");
	}
	protected initHTMLElementAttributes(): void {
		super.initHTMLElementAttributes();
		this.type = "date";
		this.pattern="\d{2}-\d{2}-\d{4}";
	}
	protected valueToStr(value: Date | null): string | null {
		if (!value) {
			return "";
		}
		return this.getDateDefaultStr(value);
	}

	public static register(): void {
		customElements.define(ControlPrefix + "-date", DateControl, {extends: "input"});
	}
}

DateControl.register();
