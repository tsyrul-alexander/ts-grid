import {BaseView} from "./base-view";
import {RowViewModel} from "../view-model/row-view-model";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid/grid-column";
import {GridColumnType} from "../model/grid/grid-column-type";
import {NotImplementedException} from "../exception/not-implemented-exception";
import {Integer} from "./control/input/integer";
import {IItemsControl} from "./control/items-control";
import {IValueControl} from "./control/value-control";
import {Text} from "./control/input/text";
import {Utilities} from "../utilities";
import {Select} from "./control/select/select";
import {IListItem} from "../model/list-item";

export class RowView extends BaseView {
	protected mainContainer: IItemsControl;
	protected columnControls: IValueControl[] = [];
	constructor(public viewModel: RowViewModel, public columns: ICollection<GridColumn>) {
		super();
		this.subscribeViewModelEvents(viewModel);
	}
	public getControl(): IControl {
		if (this.mainContainer) {
			return this.mainContainer;
		}
		this.mainContainer = this.createMainContainer();
		let columns = this.getColumns();
		columns.forEach(column => {
			this.setColumnControl(this.mainContainer, this.viewModel, column);
		}, this);
		return this.mainContainer;
	}
	protected createMainContainer(): IItemsControl {
		let container = new Container();
		container.addClass("row-view");
		return container;
	}
	protected subscribeViewModelEvents(viewModel: RowViewModel) {
		viewModel.propertyChanged.on(this.onViewModelValueChanged, this);
	}
	protected subscribeValueControlEvents(valueControl: IValueControl) {
		valueControl.valueChanged.on(this.onValueControlValueChanged, this);
	}
	protected unsubscribeViewModelEvents(viewModel: RowViewModel) {
		viewModel.propertyChanged.un(this.onViewModelValueChanged, this);
	}
	protected getColumns(): GridColumn[] {
		return this.columns.toArray();
	}
	protected setColumnControl(container: IItemsControl, viewModel: RowViewModel, column: GridColumn): void {
		let valueColumnControl = this.getValueColumnControl(viewModel, column);
		valueColumnControl.tag = column.columnName.toLowerCase();
		this.subscribeValueControlEvents(valueColumnControl);
		container.addItem(this.getColumnContainerItemControl(valueColumnControl, column));
		this.columnControls.push(valueColumnControl);
	}
	protected getColumnContainerItemControl(valueColumnControl: IValueControl, column: GridColumn): IControl {
		let containerItem = new Container();
		containerItem.setAttribute("column", column.weight.toString());
		containerItem.addClass("row-view-item");
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
		if (column.type === GridColumnType.list) {
			return this.createSelectControl(viewModel, column);
		}
		throw new NotImplementedException(column.type);
	}
	protected createStringControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new Text();
		this.setValueControlValues(control, viewModel, column);
		return control;
	}
	protected createSelectControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new Select();
		this.setValueControlValues(control, viewModel, column);
		control.loadData = this.loadSelectDate.bind(this, viewModel, column);
		return control;
	}
	protected createIntegerControl(viewModel: RowViewModel, column: GridColumn): IValueControl {
		let control = new Integer();
		this.setValueControlValues(control, viewModel, column);
		return control;
	}
	protected loadSelectDate(viewModel: RowViewModel, column: GridColumn, selectControl: Select): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			selectControl.clear();
			viewModel.getLookupValues(column.columnName, selectControl.searchText).then(listItems => {
				this.setListItemsToSelectControl(selectControl, listItems);
				resolve();
			}).catch(reject);
		})
	}
	protected setListItemsToSelectControl(selectControl: Select, listItems: IListItem[]) {
		selectControl.addItems(listItems);
	}
	protected setValueControlValues(valueControl: IValueControl, viewModel: RowViewModel, column: GridColumn) {
		let value = this.getViewModelColumnValue(viewModel, column.columnName);
		valueControl.isReadOnly = column.isReadOnly;
		valueControl.setValue(value);
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
	protected getViewModelColumnValue(viewModel: RowViewModel, columnName: string): any {
		return viewModel.get(columnName);
	}
	protected getColumnControl(columnName: string): IValueControl {
		return Utilities.getItemByKey(this.columnControls, "tag", columnName.toLowerCase());
	}
	destroy() {
		this.unsubscribeViewModelEvents(this.viewModel);
	}
}
