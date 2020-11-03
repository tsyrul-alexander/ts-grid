import {HTMLControl, IHtmlControl} from "../html-control";
import {IValueControlT} from "../value-control";
import {Event, IEvent} from "../../../model/event/event";
import {IListItem} from "../../../model/list-item";
import {ControlPrefix} from "../control";

export interface IListItemControl extends IHtmlControl, IValueControlT<IListItem> {
	selectedEvent: IEvent<IListItemControl, any>;
}

export class SelectItem extends HTMLControl(HTMLDivElement) implements IListItemControl {
	_value: IListItem;
	selectedEvent: IEvent<IListItemControl, any> = new Event<IListItemControl, any>();
	valueChanged: IEvent<IValueControlT<IListItem>, any> = new Event<IValueControlT<IListItem>, any>();
	isReadOnly: boolean;
	protected onItemClick(): void {
		this.selectedEvent.fire(this);
	}
	public getValue(): IListItem {
		return this._value;
	}
	public setValue(value: IListItem): void {
		this._value = value;
		this.textContent = value.displayValue;
	}
	public init(): void {
		super.init();
		this.addClass("select-item");
	}

	public connected(): void {
		super.connected();
		this.addEventListener("click", this.onItemClick);
	}
	public disconnected(): void {
		super.disconnected();
		this.removeEventListener("click", this.onItemClick);
	}
	public static register(): void {
		customElements.define(ControlPrefix + "-select-item", SelectItem, {extends: "div"});
	}
}

SelectItem.register();
