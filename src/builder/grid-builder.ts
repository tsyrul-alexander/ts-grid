import {BaseBuilder, IBuilder} from "./base-builder";
import {RowViewModel} from "../view-model/row-view-model";
import {IRowBuilder, RowBuilder} from "./row-builder";
import {GridColumn} from "../model/grid/grid-column";
import {ContainerControl} from "../view/control/container/container-control";
import {ColumnBuilder, IColumnBuilder} from "./column-builder";
import {GridOptions} from "../model/grid/grid-options";
import {IOptionBuilder, OptionsBuilder} from "./options-builder";
import { IControl } from "src/view/control/control";
import {Grid} from "../model/grid/grid";

export interface IGridBuilder extends IBuilder {
	grid: Grid;
	addColumn(column: GridColumn): void;
	addRow(data: any): RowViewModel;
	addRowViewModel<T extends RowViewModel>(data: any, type: (new () => T)): T;
	clear(): void;
	render(containerElement: HTMLElement): void;
}

export class GridBuilder extends BaseBuilder implements IGridBuilder {
	protected optionsBuilder: IOptionBuilder;
	protected columnBuilder: IColumnBuilder;
	protected rowBuilder: IRowBuilder;
	public grid: Grid = new Grid();
	constructor(public options: GridOptions = null) {
		super();
		this.grid.options = options;
	}

	public init(): void {
		super.init();
		this.createBuilders();
		this.initBuilders();
	}
	protected createBuilders(): void {
		this.columnBuilder = this.createColumnBuilder();
		this.rowBuilder = this.createRowBuilder();
		this.optionsBuilder = this.createOptionBuilder();
	}
	protected initBuilders(): void {
		this.columnBuilder.init();
		this.rowBuilder.init();
		this.optionsBuilder.init();
	}
	protected createColumnBuilder(): IColumnBuilder {
		return new ColumnBuilder(this.grid);
	}
	protected createOptionBuilder(): IOptionBuilder {
		return  new OptionsBuilder(this.grid);
	}
	protected createRowBuilder(): IRowBuilder {
		return new RowBuilder(this.grid);
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
		let container = new ContainerControl();
		container.addClass("grid-container");
		container.addItem(this.columnBuilder.getControl());
		container.addItem(this.rowBuilder.getControl());
		container.addItem(this.optionsBuilder.getControl());
		return container;
	}
	public destroy(): void {
		super.destroy();
		this.columnBuilder.destroy();
		this.rowBuilder.destroy();
		this.optionsBuilder.destroy();
	}
}
