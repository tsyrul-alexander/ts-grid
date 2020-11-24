import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {GridColumn} from "../model/grid/grid-column";
import {Container} from "./control/container/container";
import {Label} from "./control/display/label";
import {IItemsControl} from "./control/items-control";
import {IValueControlT} from "./control/value-control";
import {NotInitializeException} from "../exception/not-initialize-exception";
import {Button} from "./control/button/button";
import {ICollection} from "../model/collection/collection";

export class ColumnView extends BaseView {
	protected mainContainer: IItemsControl;
	protected captionControl: IValueControlT<string>;
	protected nextOrderButton: Button;
	protected previousOrderButton: Button;
	constructor(public columns: ICollection<GridColumn>, public gridColumn: GridColumn) {
		super();
	}

	protected createControl() {
		super.createControl();
		this.mainContainer = this.createMainContainer();
		this.captionControl = this.createCaptionLabel();
		this.nextOrderButton = this.getNextOrderButton();
		this.previousOrderButton = this.getPreviousOrderButton();
	}

	protected initControl(): void {
		super.initControl();
		this.mainContainer.addItem(this.previousOrderButton);
		this.mainContainer.addItem(this.captionControl);
		this.mainContainer.addItem(this.nextOrderButton);
	}
	protected subscribeGridColumnEvents(column: GridColumn): void {
		column.orderChanged.on(this.onGridColumnOrderChanged, this);
	}
	protected unsubscribeGridColumnEvents(column: GridColumn): void {
		column.orderChanged.un(this.onGridColumnOrderChanged, this);
	}
	protected onGridColumnOrderChanged(column: GridColumn): void {
		if (!this.mainContainer) {
			return
		}
		this.setColumnOrderToControl(this.mainContainer, column);
	}
	protected createMainContainer(): IItemsControl {
		let container = new Container();
		container.addClass("column-view");
		this.setColumnWeightToControl(container, this.gridColumn);
		this.setColumnOrderToControl(container, this.gridColumn);
		return container;
	}
	protected createCaptionLabel(): IValueControlT<string> {
		let label = new Label();
		label.setValue(this.gridColumn.caption);
		return label;
	}
	protected getNextOrderButton(): Button {
		let control = new Button();
		control.addClass("next-button");
		control.caption = "\u203A";
		control.clickEvent.on(this.onNextOrderClick, this);
		return control;
	}
	protected getPreviousOrderButton(): Button {
		let control = new Button();
		control.addClass("previous-button");
		control.caption = "\u2039";
		control.clickEvent.on(this.onPreviousOrderClick, this);
		return control;
	}
	protected setOrder(delta: number): void {
		if (delta > 0) {
			this.setPositiveDelta(delta);
		} else if (delta < 0) {
			this.setNegativeDelta(delta);
		}
	}
	protected setPositiveDelta(delta: number) {
		let currentOrder = this.gridColumn.order;
		let newOrder = currentOrder + delta;
		if (newOrder >= (this.columns.count + 1)) {
			return;
		}
		this.columns.each(column => {
			if (column.order > currentOrder && column.order <= newOrder) {
				column.order--;
			}
		}, this);
		this.gridColumn.order += delta;
	}
	protected setNegativeDelta(delta: number) {
		let currentOrder = this.gridColumn.order;
		let newOrder = currentOrder + delta;
		if (newOrder < 1) {
			return;
		}
		this.columns.each(column => {
			if (column.order < currentOrder && column.order >= newOrder) {
				column.order++;
			}
		}, this);
		this.gridColumn.order += delta;
	}
	protected onNextOrderClick(): void {
		this.setOrder(1);
	}
	protected onPreviousOrderClick(): void {
		this.setOrder(-1);
	}
	protected unsubscribe(): void {
		super.unsubscribe();
		this.unsubscribeGridColumnEvents(this.gridColumn);
	}
	public subscribe(): void {
		super.subscribe();
		this.subscribeGridColumnEvents(this.gridColumn);
	}
	public getControl(): IControl {
		if (this.mainContainer) {
			return this.mainContainer;
		}
		throw new NotInitializeException();
	}
	public destroy(): void {
		super.destroy();
		this.mainContainer.clear();
	}
}
