import {BaseBuilder} from "./base-builder";
import {RowViewModel} from "../view-model/row-view-model";
import {RowBuilder} from "./row-builder";
import {Collection, ICollection} from "../model/collection/collection";
import {GridRow} from "../model/grid-row";
import {GridColumn} from "../model/grid-column";
import {Container} from "../view/control/container/container";
import {ColumnBuilder} from "./column-builder";

export class GridBuilder extends BaseBuilder {
	protected rowBuilder: RowBuilder = new RowBuilder();
	protected columnBuilder: ColumnBuilder = new ColumnBuilder();
	protected rows: ICollection<GridRow> = new Collection<GridRow>();
	protected columns: ICollection<GridColumn> = new Collection<GridColumn>();
	public addColumn(column: GridColumn) {
		this.columns.add(column);
	}
	public addRow(data: any): RowViewModel {
		let viewModel = this.rowBuilder.createViewModel(data);
		let view = this.rowBuilder.createView(viewModel, this.columns);
		this.addGridRow(viewModel, view);
		return viewModel;
	}
	public render(containerElement: HTMLElement): void {
		let container = new Container();
		container.addClass("grid-container");
		container.addItem(this.columnBuilder.getControl(this.columns.toArray()));
		container.addItem(this.rowBuilder.getControl(this.rows.toArray()));
		containerElement.appendChild(container.getHTMLElement());
	}
	private addGridRow(viewModel, view): void {
		let row = new GridRow(viewModel, view);
		this.rows.add(row);
	}
}
