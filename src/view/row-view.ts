import {BaseView} from "./base-view";
import {RowViewModel} from "../view-model/row-view-model";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid-column";
import {Label} from "./control/text/label";
import {ContainerItem} from "./control/container/container-item";
import {GridColumnType} from "../model/grid-column-type";
import {NotImplementedException} from "../exception/not-implemented-exception";

export class RowView extends BaseView {
	constructor(public viewModel: RowViewModel, public columns: ICollection<GridColumn>) {
		super();
	}
	getControl(): IControl {
		let container = new Container();
		container.addClass("row-view");
		let columns = this.getColumns();
		columns.forEach(column => {
			container.addItem(this.getColumnControl(this.viewModel, column));
		}, this);
		return container;
	}
	getColumns(): GridColumn[] {
		return this.columns.toArray();
	}
	getColumnControl(viewModel: RowViewModel, column: GridColumn): IControl {
		let columnControl = this.getColumnControlByType(viewModel, column);
		let columnContainerItem = new ContainerItem(columnControl);
		columnContainerItem.addClass("row-view-item");
		return columnContainerItem;
	}
	getColumnControlByType(viewModel: RowViewModel, column: GridColumn) {
		if (column.type === GridColumnType.string) {
			return new Label(viewModel.get(column.columnName));
		}
		throw new NotImplementedException(column.type.toString());
	}
}
