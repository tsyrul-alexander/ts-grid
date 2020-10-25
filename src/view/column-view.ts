import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {GridColumn} from "../model/grid/grid-column";
import {Container} from "./control/container/container";
import {Label} from "./control/text/label";

export class ColumnView extends BaseView {
	constructor(public gridColumn: GridColumn) {
		super();
	}
	getControl(): IControl {
		let container = new Container();
		container.addClass("column-view");
		let label = new Label();
		label.setValue(this.gridColumn.columnName);
		container.addItem(label);
		return container;
	}
}