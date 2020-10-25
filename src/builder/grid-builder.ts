import {BaseBuilder} from "./base-builder";
import {RowViewModel} from "../view-model/row-view-model";
import {RowBuilder} from "./row-builder";
import {Collection, ICollection} from "../model/collection/collection";
import {GridRow} from "../model/grid/grid-row";
import {GridColumn} from "../model/grid/grid-column";
import {Container} from "../view/control/container/container";
import {ColumnBuilder} from "./column-builder";
import {GridOptions} from "../model/grid/grid-options";
import {OptionsBuilder} from "./options-builder";

export class GridBuilder extends BaseBuilder {
	protected rowBuilder: RowBuilder;
	protected columnBuilder: ColumnBuilder = new ColumnBuilder();
	protected optionsBuilder: OptionsBuilder = new OptionsBuilder();
	protected columns: ICollection<GridColumn> = new Collection<GridColumn>();
	constructor(public options: GridOptions = null) {
		super();
		this.rowBuilder = this.createRowBuilder();
	}
	createRowBuilder(): RowBuilder {
		return new RowBuilder(this.columns);
	}
	public addColumn(column: GridColumn) {
		this.columns.add(column);
	}
	public addRow(data: any): RowViewModel {
		return this.rowBuilder.addRow(data);
	}
	public render(containerElement: HTMLElement): void {
		let container = new Container();
		container.addClass("grid-container");
		container.addItem(this.columnBuilder.getControl(this.columns.toArray()));
		container.addItem(this.rowBuilder.getControl(this.columns));
		container.addItem(this.optionsBuilder.getControl(this.options));
		containerElement.appendChild(container.getHTMLElement());
	}
}