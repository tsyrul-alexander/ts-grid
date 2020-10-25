import {Event, IEvent} from "../event/event";

export class GridOptions {
	public navigationValueChanged: IEvent<GridOptions, any> = new Event<GridOptions, any>();
	public pageRowCountChanged: IEvent<GridOptions, number> = new Event<GridOptions, number>();
	private _pageRowCount: number;
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
	onNavigationValueChanged() {
		this.navigationValueChanged.fire(this);
	}
}
