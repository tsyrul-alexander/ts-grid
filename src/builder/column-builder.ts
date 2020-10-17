import {BaseBuilder} from "./base-builder";
import {GridColumn} from "../model/grid-column";
import {IControl} from "../view/control/control";
import {Container} from "../view/control/container/container";
import {ColumnView} from "../view/column-view";

export class ColumnBuilder extends BaseBuilder {
	getControl(gridColumns: GridColumn[]): IControl {
		let container = new Container();
		container.addClass("grid-container-columns");
		gridColumns.forEach(gridColumn => {
			container.addItem(this.createView(gridColumn).getControl());
		}, this);
		return container;
	}
	createView(gridColumn: GridColumn): ColumnView {
		return new ColumnView(gridColumn);
	}
}
