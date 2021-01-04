import {ControlPrefix} from "../control";
import {BaseDateControl} from "./base-date-control";

export class DateTimeControl extends BaseDateControl {
	constructor() {
		super();
		this.initHTMLElementAttributes();
		this.initHTMLClasses();
	}
	protected initHTMLClasses() {
		super.initHTMLClasses();
		this.addClass("date-time-input");
	}
	protected initHTMLElementAttributes(): void {
		super.initHTMLElementAttributes();
		this.type = "datetime-local";
	}
	protected valueToStr(value: Date | null): string | null {
		if (!value) {
			return "";
		}
		return this.getDateTimeDefaultStr(value);
	}

	public static register(): void {
		customElements.define(ControlPrefix + "-date-time", DateTimeControl, {extends: "input"});
	}
}

DateTimeControl.register();
