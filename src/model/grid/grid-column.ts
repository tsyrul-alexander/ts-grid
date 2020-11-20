import {GridColumnType} from "./grid-column-type";
import {GridColumnWeight} from "./grid-column-weight";
import {Event, IEvent} from "../event/event";

export class GridColumn {
	private _order: number = 0;
	private _isReadOnly: boolean = false;
	private readonly _caption: string;
	private readonly _columnName: string;
	private readonly _type: GridColumnType;
	private readonly _weight: GridColumnWeight;

	public orderChanged: IEvent<GridColumn, number> = new Event();
	public isReadOnlyChanged: IEvent<GridColumn, boolean> = new Event();
	public get caption(): string {
		return this._caption;
	}
	public get columnName(): string {
		return this._columnName;
	}
	public get weight(): GridColumnWeight {
		return this._weight;
	}
	public get type(): GridColumnType {
		return this._type;
	}
	public set isReadOnly(value: boolean) {
		if (this._isReadOnly === value) {
			return;
		}
		this._isReadOnly = value;
		this.isReadOnlyChanged.fire(this, value);
	}
	public get isReadOnly(): boolean {
		return this._isReadOnly;
	}
	public set order(value: number) {
		if (this._order === value) {
			return;
		}
		this._order = value;
		this.orderChanged.fire(this, value);
	}
	public get order(): number {
		return this._order;
	}

	constructor(columnName: string, caption: string, type: GridColumnType = GridColumnType.string,
				weight: GridColumnWeight = GridColumnWeight.weight1) {
		this._columnName = columnName;
		this._caption = caption;
		this._type = type;
		this._weight = weight;
	}
}
