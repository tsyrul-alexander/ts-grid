import {Event, IEvent} from "../event/event";

export class GridOptions {
	public navigationValueChanged: IEvent<GridOptions, any> = new Event<GridOptions, any>();
	public rowCountChanged: IEvent<GridOptions, number> = new Event<GridOptions, number>();
	public pageRowCountChanged: IEvent<GridOptions, number> = new Event<GridOptions, number>();
	public pageIndexChanged: IEvent<GridOptions, number> = new Event<GridOptions, number>();
	private _rowCount: number = 0;
	private _pageRowCount: number = 10;
	private _pageIndex: number = 0;

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
	onNavigationValueChanged() {
		this.navigationValueChanged.fire(this);
	}
}
