import {GridColumnType} from "./grid-column-type";

export class GridColumn {
	public columnName: string;
	public order: number;
	public type: GridColumnType = GridColumnType.string;
	constructor(columnName: string) {
		this.columnName = columnName;
	}
}
