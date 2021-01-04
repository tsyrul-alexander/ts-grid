import {BaseInputControl} from "./base-input-control";

export abstract class BaseDateControl extends BaseInputControl<Date>{
	protected constructor() {
		super();
		this.initHTMLClasses();
	}
	protected initHTMLClasses() {
		super.initHTMLClasses();
		this.addClass("base-date-input");
	}
	protected getDateTimeDefaultStr(date: Date): string {
		return date.toISOString().slice(0, 19);
	}
	protected getDateDefaultStr(date: Date): string {
		return date.toISOString().slice(0,10);
	}
	protected getTimeDefaultStr(date: Date): string {
		return date.toISOString().slice(11);
	}
	public getValue(): Date {
		return this.valueAsDate;
	}
}
