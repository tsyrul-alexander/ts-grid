import {GridColumnType} from "./grid-column-type";
import {GridColumnWeight} from "./grid-column-weight";

export class GridColumn {
	public caption: string;
	public columnName: string;
	public weight: GridColumnWeight;
	public type: GridColumnType;
	public isReadOnly: boolean;
	public order: number;
	constructor(columnName: string, caption: string, type: GridColumnType = GridColumnType.string,
				weight: GridColumnWeight = GridColumnWeight.weight1) {
		this.columnName = columnName;
		this.caption = caption;
		this.type = type;
		this.weight = weight;
	}
}
