import {Event, IEvent} from "../../../model/event/event";
import {HTMLControl} from "../html-control";
import {IValueControl, IValueControlT} from "../value-control";

export abstract class BaseInput<T> extends HTMLControl(HTMLInputElement) implements IValueControlT<T> {
	public valueChanged: IEvent<IValueControl, any> = new Event<IValueControl, any>();
	public get isReadOnly(){
		return this.readOnly;
	}
	public set isReadOnly(value: boolean){
		this.readOnly = value;
	}
	abstract getValue(): T;
	protected constructor() {
		super();
		this.initHTMLClasses();
	}
	initHTMLClasses() {
		this.addClass("base-input");
	}
	setValue(value: T): void {
		let newValue = value && value.toString() || "";
		if (newValue === this.value) {
			return;
		}
		this.value = newValue;
	}
	connected() {
		super.connected();
		this.addEventListener('change', this.onValueChanged);
	}
	disconnected() {
		super.disconnected();
		this.removeEventListener('change', this.onValueChanged);
	}
	onValueChanged() {
		this.valueChanged.fire(this, this.getValue());
	}
}
