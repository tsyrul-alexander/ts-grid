import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {GridOptions} from "../model/grid/grid-options";
import {IItemsControl} from "./control/items-control";
import {Button} from "./control/button/button";
import {IValueControl} from "./control/value-control";
import {Label} from "./control/display/label";

export class OptionsView extends BaseView {
	protected mainControl: IItemsControl;
	protected pageRowsCountControl: IValueControl;
	protected nextRowsButton: Button;
	protected nextPreviousButton: Button;
	constructor(public options: GridOptions) {
		super();
		this.options.navigationValueChanged.on(this.onNavigationValueChanged, this);
	}
	protected createMainControl(): IItemsControl {
		let container = new Container();
		container.addClass("options-view");
		container.addItem(this.nextRowsButton = this.getNextRowsButton());
		container.addItem(this.pageRowsCountControl = this.getPageRowsCountLabel());
		container.addItem(this.nextPreviousButton = this.getPreviousRowsButton());
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
		control.setValue(this.getPageRowsCountText());
		return control;
	}
	protected onNavigationValueChanged() {
		this.updatePageRowsCountControl();
	}
	protected updatePageRowsCountControl(): void {
		if (!this.pageRowsCountControl) {
			return;
		}
		this.pageRowsCountControl.setValue(this.getPageRowsCountText());
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
	public getControl(): IControl {
		if (this.mainControl) {
			return this.mainControl;
		}
		this.mainControl = this.createMainControl();
		return this.mainControl;
	}
	destroy(): void {
		super.destroy();
		this.nextRowsButton.clickEvent.un(this.onNextRowsClick, this);
		this.options.navigationValueChanged.un(this.onNavigationValueChanged, this);
	}
}
