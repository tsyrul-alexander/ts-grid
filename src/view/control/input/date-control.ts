import {BaseInputControl} from "./base-input-control";
import {ControlPrefix} from "../control";

export class DateControl extends BaseInputControl<Date>{
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
		this.type = "date";
		this.pattern="\d{2}-\d{2}-\d{4}";
	}
	protected valueToStr(value: Date | null): string | null {
		if (!value) {
			return null;
		}
		let mm = value.getMonth() + 1;
		let dd = value.getDate();
		return [value.getFullYear(),
			(mm > 9 ? '' : '0') + mm,
			(dd > 9 ? '' : '0') + dd
		].join('-');
	}
	public getValue(): Date {
		return this.valueAsDate;
	}
	connected() {
		super.connected();
		this.setStyle("height", this.parentElement.clientHeight.toString());
	}

	public static register(): void {
		customElements.define(ControlPrefix + "-date", DateControl, {extends: "input"});
	}
}

DateControl.register();
