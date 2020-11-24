import {GridBuilder, IGridBuilder} from "./builder/grid-builder";
import {GridOptions} from "./model/grid/grid-options";
import {RowViewModel} from "./view-model/row-view-model";
import {GridColumn} from "./model/grid/grid-column";
import {Grid} from "./model/grid/grid";

export abstract class GridContentBuilder {
	//region Private Properties
	protected _gridBuilder: IGridBuilder;
	protected _option: GridOptions;
	//endregion

	//region Public Properties only get
	public gridBuilder: IGridBuilder;
	public get options(): GridOptions {
		if (this._option) {
			return this._option;
		}
		return this._option = this.createGridOptions();
	}
	public get startRow(): number {
		return this.pageRowCount * this.pageIndex;
	}
	public get endRow(): number {
		return this.startRow + this.pageRowCount;
	}
	public get grid(): Grid {
		return this.gridBuilder.grid;
	}
	//endregion

	//region Public Properties
	public defaultPageRowCount: number = 10;
	public get rowCount(): number {
		return this.options.rowCount;
	}
	public set rowCount(value: number) {
		this.options.rowCount = value;
	}
	public get pageRowCount(): number {
		return this.options.pageRowCount;
	}
	public set pageRowCount(value: number) {
		this.options.pageRowCount = value;
	}
	public get pageIndex(): number {
		return this.options.pageIndex;
	}
	public set pageIndex(value: number) {
		this.options.pageIndex = value;
	}

	//endregion

	//region Protected Methods
	protected createGridBuilder(): IGridBuilder {
		return new GridBuilder(this.options);
	}
	protected onNavigationValueChanged() {
		this.reloadData();
	}
	protected loadGridData() {
		this.beforeLoadGridData();
		let loadDataPromise = this.loadData();
		loadDataPromise.then(this.onLoadGridDataSuccess.bind(this))
			.catch(this.onLoadGridDataError.bind(this))
			.finally(this.onLoadGridDataFinally.bind(this));
	}
	protected onLoadGridDataSuccess() {}
	protected onLoadGridDataError() {}
	protected onLoadGridDataFinally() {
		this.alterLoadGridData();
	}
	protected onActiveRowChanged(grid: Grid, rowViewModel: RowViewModel): void {}
	protected beforeLoadGridData() {
		this.options.isLoad = true;
	}
	protected alterLoadGridData() {
		this.options.isLoad = false;
	}
	protected subscribeGridEvent(grid: Grid) {
		grid.options.navigationValueChanged.on(this.onNavigationValueChanged, this);
		grid.activeRowChanged.on(this.onActiveRowChanged, this);
	}
	protected unsubscribeGridEvent(grid: Grid) {
		grid.options.navigationValueChanged.un(this.onNavigationValueChanged, this);
		grid.activeRowChanged.un(this.onActiveRowChanged, this);
	}
	//endregion

	//region Public Methods
	public init(): void {
		this.gridBuilder = this.createGridBuilder();
		this.gridBuilder.init();
		this.subscribeGridEvent(this.gridBuilder.grid);
	}
	public createGridOptions(): GridOptions {
		let options = new GridOptions();
		options.pageRowCount = this.defaultPageRowCount;
		return options;
	}
	public reloadData(): void {
		if (!this.gridBuilder) {
			return;
		}
		this.gridBuilder.clear();
		this.loadGridData();
	}
	public abstract loadData(): Promise<any>;
	public render(containerElement: HTMLElement): void {
		this.gridBuilder.render(containerElement);
	}
	public addRow(data: any): RowViewModel {
		return this.gridBuilder.addRow(data);
	}
	public addRowViewModel<T extends RowViewModel>(data: any, type: (new () => T)): T {
		return this.gridBuilder.addRowViewModel(data, type);
	}
	public addColumn(column: GridColumn): void {
		this.gridBuilder.addColumn(column);
	}
	public destroy(): void {
		this.unsubscribeGridEvent(this.gridBuilder.grid);
		this.gridBuilder.destroy();
	}
	//endregion
}
