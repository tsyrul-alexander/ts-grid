import {IValueControl, IValueControlT} from "../value-control";
import {IItemsControl} from "../items-control";
import {Event, IEvent} from "../../../model/event/event";
import {ControlPrefix} from "../control";
import {IListItem} from "../../../model/list-item";
import {Container} from "../container/container";
import {IListItemControl, SelectItem} from "./select-item";
import {HTMLControl, IHtmlControl} from "../html-control";
import {Text} from "../input/text";
import {Button} from "../button/button";
import {Svg} from "../display/svg";

export class Select extends HTMLControl(HTMLDivElement) implements IValueControlT<IListItem> {
	//#region Events
	valueChanged: IEvent<IValueControlT<IListItem>, IListItem> = new Event<IValueControlT<IListItem>, IListItem>();
	//#endregion

	//region Private Properties
	_itemsContainer: IItemsControl;
	_displayContainer: IItemsControl;
	_displayControl: IValueControlT<string>;
	_currentSelectedItem: IListItem;
	_searchBtn: Button;
	isReadOnly: boolean;
	//endregion'

	//region Public Properties
	public loadData: (control: Select) => Promise<any>;
	public set isShowItems(value: boolean) {
		if (this.isShowItems === value) {
			return;
		}
		this.setAttribute("showitems", String(value));
		this.onIsShowItemsChange();
	}
	public get isShowItems(): boolean {
		let strValue = this.getAttribute("showitems");
		return strValue === "true";
	}
	public set searchText(value: string) {
		this._displayControl.setValue(value);
	}
	public get searchText(): string {
		return this._displayControl.getValue();
	}
	public set currentSelectedItem(value: IListItem) {
		if (this._currentSelectedItem?.displayValue !== value.displayValue) {
			this.updateDisplayValue();
		}
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
	protected onDisplayValueChange(): void {
		this.reloadItems();
	}
	protected onItemSelected(control: IListItemControl): void {
		this.currentSelectedItem = control.getValue();
	}
	protected onSelectClick(): void {
		if (!this.getIsShowItemsContainer()) {
			this.reloadItems();
		} else {
			this.hideItemsContainer();
		}
	}
	protected onIsShowItemsChange() {
		let isShowItems = this.isShowItems;
		if (!isShowItems) {
			this.updateDisplayValue();
		}
	}
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
		this._searchBtn.content = this.getSearchButtonControlContent();
		return this._searchBtn;
	}
	protected getSearchButtonControlContent(): IHtmlControl {
		let svgElement = new Svg();
		svgElement.viewBoxWidth = 350;
		svgElement.viewBoxHeight = 350;
		svgElement.addPath("M48,161A112,112,0,1,1,160,273,112.12,112.12,0,0,1,48,161ZM374.62,330.38l-81.23-81.24" +
			"A158.83,158.83,0,0,0,320,161C320,72.78,248.22,1,160,1S0,72.78,0,161,71.78,321,160,321a158.83,158.83," +
			"0,0,0,88.14-26.61l81.24,81.23a32,32,0,0,0,45.24-45.24Z");
		return svgElement;
	}
	protected getDisplayContainer(): IItemsControl {
		if (this._displayContainer) {
			return this._displayContainer;
		}
		this._displayContainer = new Container();
		this._displayContainer.addClass("select-display-container");
		let displayControl = this.getDisplayControl();
		let searchBtn = this.getSearchButtonControl();
		this._displayContainer.addItem(displayControl);
		this._displayContainer.addItem(searchBtn);
		return this._displayContainer;
	}
	protected getDisplayControl(): IValueControlT<string> {
		if (this._displayControl) {
			return this._displayControl;
		}
		this._displayControl = new Text();
		this._displayControl.setValue(this.currentSelectedItem?.displayValue || "");
		this._displayControl.addClass("select-display-control");
		return this._displayControl;
	}
	protected getItemsContainer(): IItemsControl {
		if (this._itemsContainer) {
			return this._itemsContainer;
		}
		this._itemsContainer = new Container();
		this._itemsContainer.isVisible = this.isShowItems;
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
	protected subscribeDisplayControlEvents(control: IValueControlT<string>) {
		control.valueChanged.on(this.onDisplayValueChange, this);
	}
	protected unsubscribeDisplayControlEvents(control: IValueControlT<string>) {
		control.valueChanged.on(this.onDisplayValueChange, this);
	}
	protected subscribeSelectItemEvents(control: IListItemControl): void {
		control.selectedEvent.on(this.onItemSelected, this);
	}
	protected unsubscribeSelectItemEvents(control: IListItemControl): void {
		control.selectedEvent.un(this.onItemSelected, this);
	}
	protected reloadItems() {
		this.loadItems(() => {
			this.showItemsContainer();
		});
	}
	protected getIsShowItemsContainer(): boolean {
		return this.isShowItems;
	}
	protected showItemsContainer(): void {
		let itemsContainer = this.getItemsContainer();
		this.isShowItems = true;
		itemsContainer.isVisible = true;
	}
	protected hideItemsContainer(): void {
		let itemsContainer = this.getItemsContainer();
		this.isShowItems = false;
		itemsContainer.isVisible = false;
	}
	protected updateDisplayValue(): void {
		this._displayControl?.setValue(this.currentSelectedItem?.displayValue || "");
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
		this.initChild();
		//this.appendChild((this._searchBtn = this.getSearchButtonControl()));todo
		this.addClass("select-control");
		this.isShowItems = false;
	}
	public initChild() {
		this.appendChild((this._displayContainer = this.getDisplayContainer()).getHTMLElement());
		this.appendChild((this._itemsContainer = this.getItemsContainer()).getHTMLElement());
	}
	public connected() {
		super.connected();
		this.addEventListener('click', this.onSelectClick);
		let displayControl = this.getDisplayControl();
		this.subscribeDisplayControlEvents(displayControl);
	}
	public disconnected() {
		super.disconnected();
		this.removeEventListener('click', this.onSelectClick);
		let displayControl = this.getDisplayControl();
		this.unsubscribeDisplayControlEvents(displayControl);
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
