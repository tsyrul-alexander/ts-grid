import {BaseBuilder} from "./base-builder";
import {GridColumn} from "../model/grid/grid-column";
import {Container} from "../view/control/container/container";
import {ColumnView} from "../view/column-view";
import {IControl} from "../view/control/control";

export class ColumnBuilder extends BaseBuilder {
	getControl(gridColumns: GridColumn[]): IControl {
		let container = new Container();
		container.addClass("grid-container-columns");
		gridColumns.forEach(gridColumn => {
			let containerItem = container.addContainerItem(this.createView(gridColumn).getControl());
			containerItem.setAttribute("column", gridColumn.weight.toString());
		}, this);
		return container;
	}
	createView(gridColumn: GridColumn): ColumnView {
		return new ColumnView(gridColumn);
	}
}
