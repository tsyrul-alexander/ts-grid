import {IValueControl, IValueControlT} from "../value-control";
import {IItemsControl} from "../items-control";
import {Event, IEvent} from "../../../model/event/event";
import {ControlPrefix} from "../control";
import {IListItem} from "../../../model/list-item";
import {Container} from "../container/container";
import {IListItemControl, SelectItem} from "./select-item";
import {HTMLControl} from "../html-control";
import {Text} from "../input/text";
import {Button} from "../button/button";

export class Select extends HTMLControl(HTMLDivElement) implements IValueControlT<IListItem> {
	//#region Events
	valueChanged: IEvent<IValueControlT<IListItem>, IListItem> = new Event<IValueControlT<IListItem>, IListItem>();
	//#endregion

	//region Private Properties
	_itemsContainer: IItemsControl;
	_displayControl: IValueControlT<string>;
	_currentSelectedItem: IListItem;
	_searchBtn: Button;
	isReadOnly: boolean;
	//endregion'

	//region Public Properties
	public loadData: (control: Select) => Promise<any>;
	public get searchText(): string {
		return this._displayControl.getValue();
	}
	public set currentSelectedItem(value: IListItem) {
		if (this._currentSelectedItem === value) {
			return;
		}
		this._currentSelectedItem = value;
		this.onCurrentSelectedItemChanged();
	}
	public get currentSelectedItem(): IListItem {
		return this._currentSelectedItem;
	}
	//endregion

	//region Protected Methods
	protected onCurrentSelectedItemChanged() {
		this.updateDisplayValue();
		this.valueChanged.fire(this, this.getValue());
	}
	protected getSearchButtonControl(): Button {
		if (this._searchBtn) {
			return this._searchBtn;
		}
		this._searchBtn = new Button();
		this._searchBtn.addClass("select-search-btn");
		return this._searchBtn;
	}
	protected getDisplayControl(): IValueControlT<string> {
		if (this._displayControl) {
			return this._displayControl;
		}
		this._displayControl = new Text();
		this._displayControl.setValue(this.currentSelectedItem?.displayValue || "");
		this._displayControl.addClass("select-display-container");
		return this._displayControl;
	}
	protected getItemsContainer(): IItemsControl {
		if (this._itemsContainer) {
			return this._itemsContainer;
		}
		this._itemsContainer = new Container();
		this._itemsContainer.isVisible = false;
		this._itemsContainer.addClass("select-items-container");
		return this._itemsContainer;
	}
	protected createListItemControl(listItem: IListItem): IListItemControl {
		let control = new SelectItem();
		control.setValue(listItem);
		this.subscribeSelectItemEvents(control);
		return control;
	}
	protected addControlsToItemsContainer(controls: IListItemControl[]): void {
		let itemsContainer = this.getItemsContainer();
		itemsContainer.addItems(controls);
	}
	protected addControlToItemsContainer(control: IListItemControl): void {
		let itemsContainer = this.getItemsContainer();
		itemsContainer.addItem(control);
	}
	protected subscribeSelectItemEvents(control: IListItemControl): void {
		control.selectedEvent.on(this.onItemSelected, this);
	}
	protected unsubscribeSelectItemEvents(control: IListItemControl): void {
		control.selectedEvent.un(this.onItemSelected, this);
	}
	protected onItemSelected(control: IListItemControl): void {
		this.currentSelectedItem = control.getValue();
	}
	protected onSelectClick(): void {
		if (!this.getIsShowItemsContainer()) {
			this.loadItems(() => {
				this.showItemsContainer();
			})
		} else {
			this.hideItemsContainer();
		}
	}
	protected getIsShowItemsContainer(): boolean {
		let itemsContainer = this.getItemsContainer();
		return itemsContainer.isVisible;
	}
	protected showItemsContainer(): void {
		let itemsContainer = this.getItemsContainer();
		itemsContainer.isVisible = true;
	}
	protected hideItemsContainer(): void {
		let itemsContainer = this.getItemsContainer();
		itemsContainer.isVisible = false;
	}
	protected onDocumentClick(event): void {

	}
	protected updateDisplayValue(): void {
		this._displayControl?.setValue(this.currentSelectedItem?.displayValue);
	}
	protected loadItems(callback: () => void = null) {
		let promise = this.loadData(this);
		promise.finally(callback);
	}
	//endregion

	//region Public Methods
	public addItems(listItems: IListItem[]): void {
		this.addControlsToItemsContainer(listItems.map(this.createListItemControl, this));
	}
	public addItem(listItem: IListItem): IListItemControl {
		let control = this.createListItemControl(listItem);
		this.addControlToItemsContainer(control);
		return control;
	}
	public clear(): void {
		let itemsContainer = this.getItemsContainer();
		itemsContainer.getItems().forEach(containerItem => {
			this.unsubscribeSelectItemEvents(<IListItemControl>containerItem);
		}, this);
		itemsContainer.clear();
	}
	public init() {
		this.appendChild((this._displayControl = this.getDisplayControl()).getHTMLElement());
		this.appendChild((this._itemsContainer = this.getItemsContainer()).getHTMLElement());
		//this.appendChild((this._searchBtn = this.getSearchButtonControl()));todo
		this.addClass("select-control");
	}
	public connected() {
		super.connected();
		this.addEventListener('click', this.onSelectClick);
		document.addEventListener('click', this.onDocumentClick);
	}
	public disconnected() {
		super.disconnected();
		this.removeEventListener('click', this.onSelectClick);
		document.removeEventListener('click', this.onDocumentClick);
	}
	public getValue(): IListItem {
		return this.currentSelectedItem;
	}
	public setValue(value: IListItem): void {
		this.currentSelectedItem = value;
	}
	//endregion

	public static register(): void {
		customElements.define(ControlPrefix + "-select", Select, {extends: "div"});
	}
}

Select.register();
