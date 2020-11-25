import {BaseBuilder, IBuilder} from "./base-builder";
import {GridColumn} from "../model/grid/grid-column";
import {IControl} from "../view/control/control";
import {ColumnsView} from "../view/columns-view";
import {Collection, ICollection} from "../model/collection/collection";
import {Grid} from "../model/grid/grid";

export interface IColumnBuilder extends IBuilder {
	addColumn(gridColumn: GridColumn): void;
}

export class ColumnBuilder extends BaseBuilder implements IColumnBuilder {
	columnsView: ColumnsView;

	constructor(protected grid: Grid) {
		super();
	}
	protected createColumnsView(): ColumnsView {
		return new ColumnsView(this.grid);
	}
	protected setColumnOrder(gridColumn: GridColumn) {
		if (gridColumn.order === 0) {
			gridColumn.order = this.grid.columns.count + 1;
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
		this.grid.columns.add(gridColumn);
	}
	public getControl(): IControl {
		return this.columnsView.getControl();
	}
	public destroy(): void {
		super.destroy();
		this.columnsView.destroy();
	}
}
