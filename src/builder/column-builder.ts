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

	protected createColumnsView(): ColumnsView {
		return new ColumnsView(this.columns);
	}
	protected setColumnOrder(gridColumn: GridColumn) {
		if (gridColumn.order === 0) {
			gridColumn.order = this.columns.count + 1;
		}
	}
	public init(): void {
		super.init();
		this.columnsView = this.createColumnsView();
		this.columnsView.init();
	}
	public addColumn(gridColumn: GridColumn): void {
		this.setColumnOrder(gridColumn);
		this.columnsView.addColumn(gridColumn);
		this.columns.add(gridColumn);
	}
	public getControl(): IControl {
		return this.columnsView.getControl();
	}
	public getColumns(): ICollection<GridColumn>  {
		return this.columns;
	}
	public destroy(): void {
		super.destroy();
		this.columnsView.destroy();
	}
}
