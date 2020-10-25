import {GridColumnType} from "./grid-column-type";
import {GridColumnWeight} from "./grid-column-weight";

export class GridColumn {
	public columnName: string;
	public weight: GridColumnWeight;
	public type: GridColumnType;
	public order: number;
	constructor(columnName: string, type: GridColumnType = GridColumnType.string,
				weight: GridColumnWeight = GridColumnWeight.weight1) {
		this.columnName = columnName;
		this.type = type;
		this.weight = weight;
	}
}
