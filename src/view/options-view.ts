import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {GridOptions} from "../model/grid/grid-options";
import {IItemsControl} from "./control/items-control";
import {Button} from "./control/button/button";
import {IValueControl, IValueControlT} from "./control/value-control";
import {Label} from "./control/display/label";

export class OptionsView extends BaseView {
	protected isLoadAttributeName: string = "load";
	protected mainControl: IItemsControl;
	protected pageRowsCountControl: IValueControl;
	protected nextRowsButton: Button;
	protected previousRowsButton: Button;
	protected loadControl: IControl;
	constructor(public options: GridOptions) {
		super();
	}

	protected subscribe(): void {
		super.subscribe();
		this.options.navigationValueChanged.on(this.onNavigationValueChanged, this);
		this.options.isLoadChanged.on(this.onIsLoadChanged, this);
	}
	protected createMainControl(): IItemsControl {
		let container = new Container();
		container.addClass("options-view");
		container.addItem(this.createLeftContainer());
		container.addItem(this.createCenterContainer());
		container.addItem(this.createRightContainer());
		return container;
	}
	protected createLeftContainer(): IItemsControl {
		let container = new Container();
		container.addClass("options-view-left-container");
		container.addItem(this.loadControl = this.createLoadControl());
		return container;
	}
	protected createCenterContainer(): IItemsControl {
		let container = new Container();
		container.addClass("options-view-center-container");
		return container;
	}
	protected createRightContainer(): IItemsControl {
		let container = new Container();
		container.addClass("options-view-right-container");
		container.addItem(this.previousRowsButton = this.getPreviousRowsButton());
		container.addItem(this.pageRowsCountControl = this.getPageRowsCountLabel());
		container.addItem(this.nextRowsButton = this.getNextRowsButton());
		return container
	}
	protected createLoadControl(): IItemsControl {
		let container = new Container();
		container.addClass("options-load-control");
		this.setIsLoadToControl(container);
		return container;
	}
	protected getNextRowsButton(): Button {
		let control = new Button();
		control.addClass("next-button");
		control.caption = "\u203A";
		control.clickEvent.on(this.onNextRowsClick, this);
		return control;
	}
	protected getPreviousRowsButton(): Button {
		let control = new Button();
		control.addClass("previous-button");
		control.caption = "\u2039";
		control.clickEvent.on(this.onPreviousRowsClick, this);
		return control;
	}
	protected getPageRowsCountLabel(): IValueControl {
		let control = new Label();
		control.addClass("page-row-count-text");
		this.setPageRowsCountToControl(control);
		return control;
	}
	protected onNavigationValueChanged(): void {
		this.setPageRowsCountToControl(this.pageRowsCountControl);
	}
	protected onIsLoadChanged(): void {
		this.setIsLoadToControl(this.loadControl);
		this.setControlReadOnlyStatus(this.options.isLoad);
	}
	protected setControlReadOnlyStatus(isReadOnly: boolean): void {
		if (this.nextRowsButton) {
			this.nextRowsButton.isReadOnly = isReadOnly;
		}
		if (this.previousRowsButton) {
			this.previousRowsButton.isReadOnly = isReadOnly;
		}
	}
	protected setIsLoadToControl(control: IControl): void {
		if (!control) {
			return;
		}
		control.setAttribute(this.isLoadAttributeName, String(this.options.isLoad));
	}
	protected setPageRowsCountToControl(control: IValueControlT<string>): void {
		if (!control) {
			return;
		}
		control.setValue(this.getPageRowsCountText());
	}
	protected getPageRowsCountText() {
		let startRow = this.options.pageIndex + 1;
		let endRow = Math.ceil(this.options.rowCount / this.options.pageRowCount);
		if (startRow > endRow) {
			startRow = endRow;
		}
		return startRow + " / " + endRow;
	}
	protected onPreviousRowsClick() {
		if (this.options.pageIndex <= 0) {
			return;
		}
		this.options.pageIndex--;
	}
	protected onNextRowsClick() {
		if (this.options.rowCount <= (this.options.pageRowCount * (this.options.pageIndex + 1))) {
			return;
		}
		this.options.pageIndex++;
	}
	protected unsubscribe(): void {
		super.unsubscribe();
		this.nextRowsButton.clickEvent.un(this.onNextRowsClick, this);
		this.previousRowsButton.clickEvent.un(this.onPreviousRowsClick, this);
		this.options.navigationValueChanged.un(this.onNavigationValueChanged, this);
		this.options.isLoadChanged.un(this.onIsLoadChanged, this);
	}
	public getControl(): IControl {
		if (this.mainControl) {
			return this.mainControl;
		}
		this.mainControl = this.createMainControl();
		return this.mainControl;
	}
}
