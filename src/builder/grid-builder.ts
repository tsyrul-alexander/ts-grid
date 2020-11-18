import {BaseBuilder} from "./base-builder";
import {RowViewModel} from "../view-model/row-view-model";
import {IRowBuilder, RowBuilder} from "./row-builder";
import {GridColumn} from "../model/grid/grid-column";
import {Container} from "../view/control/container/container";
import {ColumnBuilder, IColumnBuilder} from "./column-builder";
import {GridOptions} from "../model/grid/grid-options";
import {IOptionBuilder, OptionsBuilder} from "./options-builder";
import { IControl } from "src/view/control/control";

export interface IGridBuilder {
	addColumn(column: GridColumn): void;

	addRow(data: any): RowViewModel;

	addRowViewModel<T extends RowViewModel>(data: any, type: (new () => T)): T;

	clear(): void;

	render(containerElement: HTMLElement): void;
}

export class GridBuilder extends BaseBuilder implements IGridBuilder {
	protected _rowBuilder: IRowBuilder;
	protected _columnBuilder: IColumnBuilder;
	protected _optionsBuilder: IOptionBuilder;
	protected get optionsBuilder(): IOptionBuilder {
		if (this._optionsBuilder) {
			return this._optionsBuilder;
		}
		return this._optionsBuilder = this.createOptionBuilder();
	}
	protected get columnBuilder(): IColumnBuilder {
		if (this._columnBuilder) {
			return this._columnBuilder;
		}
		return this._columnBuilder = this.createColumnBuilder();
	}
	protected get rowBuilder(): IRowBuilder {
		if (this._rowBuilder) {
			return this._rowBuilder;
		}
		return this._rowBuilder = this.createRowBuilder();
	}

	constructor(public options: GridOptions = null) {
		super();
	}

	protected createColumnBuilder(): IColumnBuilder {
		return new ColumnBuilder();
	}

	protected createOptionBuilder(): IOptionBuilder {
		let builder = new OptionsBuilder();
		builder.options = this.options;
		return builder;
	}

	protected createRowBuilder(): RowBuilder {
		return new RowBuilder(this.columnBuilder.getColumns());
	}

	public addColumn(column: GridColumn): void {
		this.columnBuilder.addColumn(column);
	}

	public addRow(data: any): RowViewModel {
		return this.rowBuilder.addRow(data);
	}

	public addRowViewModel<T extends RowViewModel>(data: any, type: (new () => T)): T {
		return this.rowBuilder.addRowViewModel(data, type);
	}

	public clear(): void {
		this.rowBuilder.clear();
	}

	public render(containerElement: HTMLElement): void {
		let control = this.getControl();
		containerElement.appendChild(control.getHTMLElement());
	}

	public getControl(): IControl {
		let container = new Container();
		container.addClass("grid-container");
		container.addItem(this.columnBuilder.getControl());
		container.addItem(this.rowBuilder.getControl());
		container.addItem(this.optionsBuilder.getControl());
		return container;
	}
}
