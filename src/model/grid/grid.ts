import {GridColumn} from "./grid-column";
import {Collection, ICollection} from "../collection/collection";
import {GridOptions} from "./grid-options";
import {RowViewModel} from "../../view-model/row-view-model";
import {Event, IEvent} from "../event/event";

export class Grid {
	public activeRowChanged: IEvent<Grid, RowViewModel> = new Event();
	private _activeRow: RowViewModel;
	public get activeRow(): RowViewModel {
		return this._activeRow;
	}
	public set activeRow(value: RowViewModel) {
		if (this._activeRow === value) {
			return;
		}
		this._activeRow = value;
		this.activeRowChanged.fire(this, value);
	}
	public columns: ICollection<GridColumn> = new Collection();
	public rows: ICollection<RowViewModel> = new Collection();
	public options: GridOptions = null;
}
