import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {GridColumn} from "../model/grid/grid-column";
import {ContainerControl} from "./control/container/container-control";
import {LabelControl} from "./control/display/label-control";
import {IItemsControl} from "./control/items-control";
import {IValueControlT} from "./control/value-control";
import {NotInitializeException} from "../exception/not-initialize-exception";
import {ButtonControl} from "./control/button/button-control";
import {Grid} from "../model/grid/grid";
import {GridOptions} from "../model/grid/grid-options";
import {GridColumnSortDirection} from "../model/grid/grid-column-sort-direction";

export class ColumnView extends BaseView {
	protected mainContainer: IItemsControl;
	protected captionControl: IValueControlT<string>;
	protected orderControl: IValueControlT<string>;
	protected nextOrderButton: ButtonControl;
	protected previousOrderButton: ButtonControl;
	constructor(public grid: Grid, public gridColumn: GridColumn) {
		super();
	}

	protected createControl() {
		super.createControl();
		this.mainContainer = this.createMainContainer();
		this.captionControl = this.createCaptionLabel();
		this.nextOrderButton = this.getNextOrderButton();
		this.previousOrderButton = this.getPreviousOrderButton();
		this.orderControl = this.getOrderLabel();
	}

	protected initControl(): void {
		super.initControl();
		this.mainContainer.addItem(this.previousOrderButton);
		this.mainContainer.addItem(this.captionControl);
		this.mainContainer.addItem(this.orderControl);
		this.mainContainer.addItem(this.nextOrderButton);
	}
	protected subscribeGridEvents(grid: Grid): void {
		grid.options.sortColumnChanged.on(this.onSortColumnChanged, this);
		grid.options.sortDirectionChanged.on(this.onSortDirectionChanged, this);
	}
	protected unsubscribeGridEvents(grid: Grid): void {
		grid.options.sortColumnChanged.un(this.onSortColumnChanged, this);
		grid.options.sortDirectionChanged.un(this.onSortDirectionChanged, this);
	}
	protected subscribeGridColumnEvents(column: GridColumn): void {
		column.orderChanged.on(this.onGridColumnOrderChanged, this);
	}
	protected unsubscribeGridColumnEvents(column: GridColumn): void {
		column.orderChanged.un(this.onGridColumnOrderChanged, this);
	}
	protected subscribeCaptionLabelEvents(control: IValueControlT<string>): void {
		control.clickEvent.on(this.onCaptionLabelClick, this);
	}
	protected unsubscribeCaptionLabelEvents(control: IValueControlT<string>): void {
		control.clickEvent.un(this.onCaptionLabelClick, this);
	}
	protected subscribeOrderLabelEvents(control: IValueControlT<string>): void {
		control.clickEvent.on(this.onOrderLabelClick, this);
	}
	protected unsubscribeOrderLabelEvents(control: IValueControlT<string>): void {
		control.clickEvent.un(this.onOrderLabelClick, this);
	}
	protected subscribeNextOrderButtonEvents(control: ButtonControl): void {
		control.clickEvent.on(this.onNextOrderClick, this);
	}
	protected unsubscribeNextOrderButtonEvents(control: ButtonControl): void {
		control.clickEvent.on(this.onNextOrderClick, this);
	}
	protected subscribePreviousOrderButtonEvents(control: ButtonControl): void {
		control.clickEvent.on(this.onPreviousOrderClick, this);
	}
	protected unsubscribePreviousOrderButtonEvents(control: ButtonControl): void {
		control.clickEvent.on(this.onPreviousOrderClick, this);
	}
	protected onSortColumnChanged(option: GridOptions, column: GridColumn) {
		if (column === this.gridColumn) {
			this.setSortDirectionAttribute(option.sortDirection);
		} else {
			this.setSortDirectionAttribute(null);
		}
	}
	protected setSortDirectionAttribute(direction: GridColumnSortDirection | null) {
		if (!direction) {
			this.mainContainer.removeAttribute("order-direction");
		} else {
			this.mainContainer.setAttribute("order-direction", direction.toString());
		}
	}
	protected onSortDirectionChanged() {
		if (this.gridColumn !== this.grid.options.sortColumn) {
			return;
		}
		this.setSortDirectionAttribute(this.grid.options.sortDirection);
	}
	protected onGridColumnOrderChanged(column: GridColumn): void {
		if (!this.mainContainer) {
			return
		}
		this.setColumnOrderToControl(this.mainContainer, column);
	}
	protected changeColumnSort() {
		if (this.grid.options.isLoad) {
			return;
		}
		if (this.grid.options.sortColumn === this.gridColumn) {
			this.setOrderNextDirection();
		} else {
			this.setSortColumn(this.gridColumn);
		}
	}
	protected onCaptionLabelClick() {
		this.changeColumnSort();
	}
	protected onOrderLabelClick() {
		this.changeColumnSort();
	}
	protected createMainContainer(): IItemsControl {
		let container = new ContainerControl();
		container.addClass("column-view");
		this.setColumnWeightToControl(container, this.gridColumn);
		this.setColumnOrderToControl(container, this.gridColumn);
		return container;
	}
	protected createCaptionLabel(): IValueControlT<string> {
		let label = new LabelControl();
		label.setValue(this.gridColumn.caption);
		return label;
	}
	protected getNextOrderButton(): ButtonControl {
		let control = new ButtonControl();
		control.addClass("next-button");
		control.caption = "\u203A";
		return control;
	}
	protected getPreviousOrderButton(): ButtonControl {
		let control = new ButtonControl();
		control.addClass("previous-button");
		control.caption = "\u2039";
		return control;
	}
	protected getOrderLabel(): IValueControlT<string> {
		let control = new LabelControl();
		control.addClass("order-label");
		control.setValue("\u203A");
		return control;
	}
	protected setOrderNextDirection() {
		let currentDirection = this.grid.options.sortDirection;
		if (currentDirection === GridColumnSortDirection.ASC) {
			this.grid.options.sortDirection = GridColumnSortDirection.DESC;
		} else {
			this.grid.options.sortDirection = GridColumnSortDirection.ASC;
		}
	}
	protected setSortColumn(column: GridColumn) {
		this.grid.options.sortColumn = column;
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
		if (newOrder >= (this.grid.columns.count)) {
			return;
		}
		this.grid.columns.each(column => {
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
		this.grid.columns.each(column => {
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
	public subscribe(): void {
		super.subscribe();
		this.subscribeGridColumnEvents(this.gridColumn);
		this.subscribeGridEvents(this.grid);
		this.subscribeCaptionLabelEvents(this.captionControl);
		this.subscribeOrderLabelEvents(this.orderControl);
		this.subscribeNextOrderButtonEvents(this.nextOrderButton);
		this.subscribePreviousOrderButtonEvents(this.previousOrderButton);
	}
	protected unsubscribe(): void {
		super.unsubscribe();
		this.unsubscribeGridColumnEvents(this.gridColumn);
		this.unsubscribeGridEvents(this.grid);
		this.unsubscribeCaptionLabelEvents(this.captionControl);
		this.unsubscribeOrderLabelEvents(this.orderControl);
		this.unsubscribeNextOrderButtonEvents(this.nextOrderButton);
		this.unsubscribePreviousOrderButtonEvents(this.previousOrderButton);
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
