import {Event, IEvent} from "../../../model/event/event";
import {HTMLControl} from "../html-control";
import {IValueControl} from "../value-control";

export abstract class BaseInput<T> extends HTMLControl(HTMLInputElement) implements IValueControl {
	public valueChanged: IEvent<IValueControl, any> = new Event<IValueControl, any>();
	abstract getValue(): T;
	setValue(value: T): void {
		let newValue = value.toString();
		if (newValue === this.value) {
			return;
		}
		this.value = value.toString();
	}
	connectedCallback() {
		if (!this.isConnected) {
			return;
		}
		this.addEventListener('change', this.onValueChanged);
	}
	disconnectedCallback() {
		this.removeEventListener('change', this.onValueChanged);
	}
	onValueChanged() {
		this.valueChanged.fire(this, this.getValue());
	}
}
