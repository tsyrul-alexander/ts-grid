import {BaseBuilder, IBuilder} from "./base-builder";
import {GridColumn} from "../model/grid/grid-column";
import {IControl} from "../view/control/control";
import {ColumnsView} from "../view/columns-view";
import {Collection, ICollection} from "../model/collection/collection";

export interface IColumnBuilder extends IBuilder {
	addColumn(gridColumn: GridColumn): void;
	getColumns(): ICollection<GridColumn>;
}

export class ColumnBuilder extends BaseBuilder implements IColumnBuilder {
	columnsView: ColumnsView;
	columns: ICollection<GridColumn> = new Collection();
	addColumn(gridColumn: GridColumn): void {
		let columnsView = this.getColumnsView();
		columnsView.addColumn(gridColumn);
		this.columns.add(gridColumn);
	}
	getControl(): IControl {
		let columnView = this.getColumnsView();
		return columnView.getControl();
	}
	getColumnsView(): ColumnsView {
		if (this.columnsView) {
			return this.columnsView;
		}
		let columnsView = new ColumnsView();
		return this.columnsView = columnsView;
	}
	getColumns(): ICollection<GridColumn>  {
		return this.columns;
	}
}
