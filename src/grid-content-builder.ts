import {GridBuilder, IGridBuilder} from "./builder/grid-builder";
import {GridOptions} from "./model/grid/grid-options";
import {RowViewModel} from "./view-model/row-view-model";
import {GridColumn} from "./model/grid/grid-column";

export abstract class GridContentBuilder {
	//region Private Properties
	protected _gridBuilder: IGridBuilder;
	protected _option: GridOptions;
	//endregion

	//region Public Properties only get
	public get gridBuilder(): IGridBuilder {
		if (this._gridBuilder) {
			return this._gridBuilder;
		}
		return this._gridBuilder = this.createGridBuilder();
	}
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
		let builder = new GridBuilder();
		builder.options = this.options;
		return builder;
	}
	protected onNavigationValueChanged() {
		this.reloadData();
	}
	protected loadGridData() {
		let loadDataPromise = this.loadData();
		loadDataPromise.then(this.onLoadGridDataSuccess)
			.catch(this.onLoadGridDataError)
			.finally(this.onLoadGridDataFinally);
	}
	protected onLoadGridDataSuccess() {}
	protected onLoadGridDataError() {}
	protected onLoadGridDataFinally() {}
	protected subscribeGridOptionsEvent(options: GridOptions) {
		options.navigationValueChanged.on(this.onNavigationValueChanged, this);
	}
	protected unsubscribeGridOptionsEvent(options: GridOptions) {
		options.navigationValueChanged.on(this.onNavigationValueChanged, this);
	}
	//endregion

	//region Public Methods
	public init(): void {
		this.subscribeGridOptionsEvent(this.options);
		this.gridBuilder.init();
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
		this.unsubscribeGridOptionsEvent(this.options);
		this.gridBuilder.destroy();
	}
	//endregion
}
