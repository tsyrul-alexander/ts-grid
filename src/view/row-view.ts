import {BaseView} from "./base-view";
import {RowViewModel} from "../view-model/row-view-model";
import {IControl} from "./control/control";
import {ContainerControl} from "./control/container/container-control";
import {ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid/grid-column";
import {GridColumnType} from "../model/grid/grid-column-type";
import {NotImplementedException} from "../exception/not-implemented-exception";
import {IntegerControl} from "./control/input/integer-control";
import {IItemsControl} from "./control/items-control";
import {IValueControl} from "./control/value-control";
import {TextControl} from "./control/input/text-control";
import {Utilities} from "../utilities";
import {SelectControl} from "./control/select/select-control";
import {IListItem} from "../model/list-item";
import {Event, IEvent} from "../model/event/event";
import {FloatControl} from "./control/input/float-control";
import {DateControl} from "./control/input/date-control";
import {DateTimeControl} from "./control/input/date-time-control";

export class RowView extends BaseView {
	protected mainContainer: IItemsControl;
	protected columnControls: IValueControl[] = [];
	public click: IEvent<RowView, any> = new Event();

	constructor(public viewModel: RowViewModel, public columns: ICollection<GridColumn>) {
		super();
	}

	protected createControl() {
		super.createControl();
		this.mainContainer = this.createMainContainer();
	}
	protected initControl() {
		super.initControl();
		this.setColumnControls();
	}
	protected setColumnControls() {
		this.columns.each(column => {
			this.setColumnControl(this.mainContainer, this.viewModel, column);
		}, this);
	}
	protected subscribe(): void {
		super.subscribe();
		this.subscribeViewModelEvents(this.viewModel);
		this.subscribeColumnCollectionEvents(this.columns);
	}
	protected subscribeValueControlEvents(valueControl: IValueControl) {
		valueControl.valueChanged.on(this.onValueControlValueChanged, this);
	}
	protected unsubscribeValueControlEvents(valueControl: IValueControl) {
		valueControl.valueChanged.un(this.onValueControlValueChanged, this);
	}
	protected subscribeViewModelEvents(viewModel: RowViewModel) {
		viewModel.propertyChanged.on(this.onViewModelValueChanged, this);
	}
	protected unsubscribeViewModelEvents(viewModel: RowViewModel) {
		viewModel.propertyChanged.un(this.onViewModelValueChanged, this);
	}
	protected subscribeColumnCollectionEvents(collection: ICollection<GridColumn>) {
		collection.each(this.subscribeGridColumnEvents, this);
		collection.addedItem.on(this.onAddGridColumn, this);
	}
	protected unsubscribeColumnCollectionEvents(collection: ICollection<GridColumn>) {
		collection.addedItem.un(this.onAddGridColumn, this);
	}
	protected subscribeGridColumnEvents(column: GridColumn) {
		column.orderChanged.on(this.onGridColumnOrderChanged, this);
		column.isReadOnlyChanged.on(this.onGridColumnIsReadOnlyChanged, this);
	}
	protected unsubscribeGridColumnEvents(column: GridColumn) {
		column.orderChanged.un(this.onGridColumnOrderChanged, this);
		column.isReadOnlyChanged.un(this.onGridColumnIsReadOnlyChanged, this);
	}
	protected createMainContainer(): IItemsControl {
		let container = new ContainerControl();
		container.addClass("row-view");
		container.clickEvent.on(this.onMainContainerClick, this);
		return container;
	}
	protected setColumnControl(container: IItemsControl, viewModel: RowViewModel, column: GridColumn): void {
		let valueColumnControl = this.getValueColumnControl(viewModel, column);
		valueColumnControl.tag = column.columnName;
		this.subscribeValueControlEvents(valueColumnControl);
		container.addItem(this.getColumnContainerItemControl(valueColumnControl, column));
		this.columnControls.push(valueColumnControl);
	}
	protected getColumnContainerItemControl(valueColumnControl: IValueControl, column: GridColumn): IControl {
		let containerItem = new ContainerControl();
		containerItem.tag = column.columnName;
		containerItem.setAttribute("column", column.weight.toString());
		containerItem.addClass("row-view-item");
		this.setColumnOrderToControl(containerItem, column);
		containerItem.addItem(valueColumnControl);
		return containerItem;
	}
	protected getValueColumnControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		if (column.type === GridColumnType.string) {
			return this.createStringControl(viewModel, column);
		}
		if (column.type === GridColumnType.integer) {
			return this.createIntegerControl(viewModel, column);
		}
		if (column.type === GridColumnType.float) {
			return this.createFloatControl(viewModel, column);
		}
		if (column.type === GridColumnType.list) {
			return this.createSelectControl(viewModel, column);
		}
		if (column.type === GridColumnType.date) {
			return this.createDateControl(viewModel, column);
		}
		if (column.type === GridColumnType.dateTime) {
			return this.createDateTimeControl(viewModel, column);
		}
		throw new NotImplementedException(column.type);
	}
	protected createStringControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new TextControl();
		this.setValueControlValues(control, viewModel, column);
		return control;
	}
	protected createDateTimeControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new DateTimeControl();
		this.setValueControlValues(control, viewModel, column);
		return control;
	}
	protected createDateControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new DateControl();
		this.setValueControlValues(control, viewModel, column);
		return control;
	}
	protected createSelectControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new SelectControl();
		this.setValueControlValues(control, viewModel, column);
		control.loadData = this.loadSelectData.bind(this, viewModel, column);
		return control;
	}
	protected createFloatControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new FloatControl();
		this.setValueControlValues(control, viewModel, column);
		return control;
	}
	protected createIntegerControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new IntegerControl();
		this.setValueControlValues(control, viewModel, column);
		return control;
	}
	protected loadSelectData(viewModel: RowViewModel, column: GridColumn, selectControl: SelectControl): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			selectControl.clear();
			viewModel.getLookupValues(column.columnName, selectControl.searchText).then(listItems => {
				this.setListItemsToSelectControl(selectControl, listItems);
				resolve();
			}).catch(reject);
		});
	}
	protected setListItemsToSelectControl(selectControl: SelectControl, listItems: IListItem[]) {
		selectControl.addItems(listItems);
	}
	protected setValueControlValues(valueControl: IValueControl, viewModel: RowViewModel, column: GridColumn) {
		let value = this.getViewModelColumnValue(viewModel, column.columnName);
		this.setIsReadOnlyToValueControl(valueControl, column);
		valueControl.setValue(value);
	}
	protected setIsReadOnlyToValueControl(valueControl: IValueControl, column: GridColumn) {
		valueControl.isReadOnly = column.isReadOnly;
	}
	protected onMainContainerClick() {
		this.click.fire(this, null);
	}
	protected onViewModelValueChanged(viewModel: RowViewModel, columnName: string) {
		let value = this.getViewModelColumnValue(viewModel, columnName);
		let columnControl = this.getColumnControl(columnName);
		columnControl.setValue(value);
	}
	protected onValueControlValueChanged(control: IValueControl, value: any) {
		let columnName = control.tag;
		this.viewModel.set(columnName, value);
	}
	protected onAddGridColumn(collection: ICollection<GridColumn>, column: GridColumn): void {
		this.subscribeGridColumnEvents(column);
	}
	protected onGridColumnOrderChanged(column: GridColumn): void {
		let control = this.getColumnContainerControl(column.columnName);
		if (!control) {
			return
		}
		this.setColumnOrderToControl(control, column);
	}
	protected onGridColumnIsReadOnlyChanged(column: GridColumn) {
		let control = this.getColumnControl(column.columnName);
		if (!control) {
			return
		}
		this.setIsReadOnlyToValueControl(control, column);
	}
	protected getViewModelColumnValue(viewModel: RowViewModel, columnName: string): any {
		return viewModel.get(columnName);
	}
	protected getColumnControl(columnName: string): IValueControl {
		return Utilities.getItemByKey(this.columnControls, "tag", columnName);
	}
	protected getColumnContainerControl(columnName: string): IItemsControl {
		return <IItemsControl>Utilities.getItemByKey(this.mainContainer.getItems(), "tag", columnName);
	}
	protected unsubscribe() {
		this.unsubscribeViewModelEvents(this.viewModel);
		this.columnControls.forEach(this.unsubscribeValueControlEvents, this);
		this.columns.each(this.unsubscribeGridColumnEvents, this);
		this.unsubscribeColumnCollectionEvents(this.columns);
	}
	public getControl(): IControl {
		return this.mainContainer;
	}
}
