import {Event, IEvent} from "../../../model/event/event";
import {HTMLControl} from "../html-control";
import {IValueControl, IValueControlT} from "../value-control";

export abstract class BaseInputControl<T> extends HTMLControl(HTMLInputElement) implements IValueControlT<T> {
	public valueChanged: IEvent<IValueControl, any> = new Event<IValueControl, any>();
	protected oldValue: any;
	public get isReadOnly(){
		return this.readOnly;
	}
	public set isReadOnly(value: boolean){
		this.readOnly = value;
	}
	protected constructor() {
		super();
		this.initHTMLClasses();
		this.initHTMLElementAttributes();
	}
	protected initHTMLClasses() {
		this.addClass("base-input");
	}
	protected initHTMLElementAttributes() {}
	public connected() {
		super.connected();
		this.addEventListener('change', this.onValueChangedEvent);
		this.addEventListener('input', this.onValueInputEvent);
	}
	public disconnected() {
		super.disconnected();
		this.removeEventListener('change', this.onValueChangedEvent);
		this.removeEventListener('input', this.onValueInputEvent);
	}
	protected onValueChangedEvent() {
		this.onValueChanged();
	}
	protected onValueInputEvent() {}
	protected onValueChanged() {
		let newValue = this.getValue();
		if (!this.getIsValueChange(newValue)) {
			return;
		}
		this.valueChanged.fire(this, newValue);
		this.setOldValue(newValue);
	}
	protected valueToStr(value: T): string {
		return value && value.toString() || "";
	}
	protected getIsValueChange(newValue: any): boolean {
		return this.oldValue !== newValue;
	}
	protected setOldValue(newValue: any): void {
		this.oldValue = newValue;
	}
	public abstract getValue(): T;
	public setValue(value: T): void {
		let newValueStr = this.valueToStr(value);
		if (newValueStr === this.value) {
			return;
		}
		this.value = newValueStr;
	}
}
