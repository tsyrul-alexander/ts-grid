import {Event, IEvent} from "../event/event";
import {GridColumn} from "./grid-column";
import {GridColumnSortDirection} from "./grid-column-sort-direction";

export class GridOptions {
	public navigationValueChanged: IEvent<GridOptions, any> = new Event<GridOptions, any>();
	public rowCountChanged: IEvent<GridOptions, number> = new Event<GridOptions, number>();
	public pageRowCountChanged: IEvent<GridOptions, number> = new Event<GridOptions, number>();
	public pageIndexChanged: IEvent<GridOptions, number> = new Event<GridOptions, number>();
	public isLoadChanged: IEvent<GridOptions, boolean> = new Event<GridOptions, boolean>();
	public errorMessageChanged: IEvent<GridOptions, string> = new Event<GridOptions, string>();
	public sortColumnChanged: IEvent<GridOptions, GridColumn> = new Event<GridOptions, GridColumn>();
	public sortDirectionChanged: IEvent<GridOptions, GridColumnSortDirection> = new Event<GridOptions, GridColumnSortDirection>();
	private _rowCount: number = 0;
	private _pageRowCount: number = 10;
	private _pageIndex: number = 0;
	private _isLoad: boolean = false;
	private _errorMessage: string = null;
	private _sortColumn: GridColumn = null;
	private _sortDirection: GridColumnSortDirection = GridColumnSortDirection.ASC;

	public get rowCount(): number {
		return this._rowCount;
	}
	public set rowCount(value: number) {
		if (this._rowCount === value) {
			return;
		}
		this._rowCount = value;
		this.rowCountChanged.fire(this, value);
		this.onNavigationValueChanged();
	}
	public get pageRowCount(): number {
		return this._pageRowCount;
	}
	public set pageRowCount(value: number) {
		if (this._pageRowCount === value) {
			return;
		}
		this._pageRowCount = value;
		this.pageRowCountChanged.fire(this, value);
		this.onNavigationValueChanged();
	}
	public get pageIndex(): number {
		return this._pageIndex;
	}
	public set pageIndex(value: number) {
		if (this._pageIndex === value) {
			return;
		}
		this._pageIndex = value;
		this.pageIndexChanged.fire(this, value);
		this.onNavigationValueChanged();
	}
	public get isLoad(): boolean {
		return this._isLoad;
	}
	public set isLoad(value: boolean) {
		if (this._isLoad === value) {
			return;
		}
		this._isLoad = value;
		this.isLoadChanged.fire(this, value);
	}
	public get errorMessage(): string {
		return this._errorMessage;
	}
	public set errorMessage(value: string) {
		this._errorMessage = value;
		this.errorMessageChanged.fire(this, value);
	}
	public get sortColumn(): GridColumn {
		return this._sortColumn;
	}
	public set sortColumn(value: GridColumn) {
		if (this._sortColumn === value) {
			return;
		}
		this._sortColumn = value;
		this._sortDirection = this.getDefaultOrderDirection();
		this.sortColumnChanged.fire(this, value);
	}
	public get sortDirection(): GridColumnSortDirection {
		return this._sortDirection || this.getDefaultOrderDirection();
	}
	public set sortDirection(value: GridColumnSortDirection) {
		if (this._sortDirection === value) {
			return;
		}
		this._sortDirection = value;
		this.sortDirectionChanged.fire(this, value);
	}

	protected onNavigationValueChanged() {
		this.navigationValueChanged.fire(this);
	}
	protected getDefaultOrderDirection(): GridColumnSortDirection {
		return GridColumnSortDirection.ASC;
	}
}
