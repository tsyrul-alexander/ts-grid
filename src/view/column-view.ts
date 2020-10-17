import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {GridColumn} from "../model/grid-column";
import {Container} from "./control/container/container";
import {Label} from "./control/text/label";

export class ColumnView extends BaseView {
	constructor(public gridColumn: GridColumn) {
		super();
	}
	getControl(): IControl {
		let container = new Container();
		container.addClass("column-view");
		container.addItem(new Label(this.gridColumn.columnName));
		return container;
	}
}
