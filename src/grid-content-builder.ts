import {GridBuilder, IGridBuilder} from "./builder/grid-builder";
import {GridOptions} from "./model/grid/grid-options";
import {RowViewModel} from "./view-model/row-view-model";
import {GridColumn} from "./model/grid/grid-column";
import {Grid} from "./model/grid/grid";
import {GridColumnSortDirection} from "./model/grid/grid-column-sort-direction";

export abstract class GridContentBuilder {
	//region Private Properties
	protected _option: GridOptions;
	protected _isRenderer: boolean = false;
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
	public get sortDirection(): GridColumnSortDirection {
		return this.options.sortDirection;
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
	public get sortColumn(): GridColumn {
		return this.options.sortColumn;
	}
	public set sortColumn(column: GridColumn) {
		this.options.sortColumn = column;
	}
	//endregion

	//region Protected Methods
	protected createGridBuilder(): IGridBuilder {
		return new GridBuilder(this.options);
	}
	protected onSortDirectionChanged() {
		this.reloadData();
	}
	protected onSortColumnChanged() {
		this.reloadData();
	}
	protected onNavigationValueChanged() {
		this.reloadData();
	}
	protected loadGridData() {
		if (!this._isRenderer) {
			return;
		}
		this.beforeLoadGridData();
		let loadDataPromise = this.loadData();
		loadDataPromise.then(this.onLoadGridDataSuccess.bind(this))
			.catch(this.onLoadGridDataError.bind(this))
			.finally(this.onLoadGridDataFinally.bind(this));
	}
	protected onLoadGridDataSuccess() {}
	protected onLoadGridDataError(reason: any | null) {
		this.setErrorText(reason);
	}
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
		grid.options.sortColumnChanged.on(this.onSortColumnChanged, this);
		grid.options.sortDirectionChanged.on(this.onSortDirectionChanged, this);
		grid.activeRowChanged.on(this.onActiveRowChanged, this);
	}
	protected unsubscribeGridEvent(grid: Grid) {
		grid.options.navigationValueChanged.un(this.onNavigationValueChanged, this);
		grid.options.sortColumnChanged.un(this.onSortColumnChanged, this);
		grid.options.sortDirectionChanged.un(this.onSortDirectionChanged, this);
		grid.activeRowChanged.un(this.onActiveRowChanged, this);
	}
	protected setErrorText(reason: any | null): void {
		this.options.errorMessage = reason.toString() || this.getDefaultErrorMessage();
	}
	protected getDefaultErrorMessage(): string {
		return "error";
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
		this._isRenderer = true;
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
	public getColumnByName(columnName: string): GridColumn | null {
		return this.grid.columns.getItemByFn(item => item.columnName === columnName);
	}
	public destroy(): void {
		this.unsubscribeGridEvent(this.gridBuilder.grid);
		this.gridBuilder.destroy();
	}
	//endregion
}
