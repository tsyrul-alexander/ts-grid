import {BaseView} from "./base-view";
import {GridColumn} from "../model/grid/grid-column";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {ColumnView} from "./column-view";
import {IItemsControl} from "./control/items-control";

export class ColumnsView extends BaseView {
	protected _mainContainer: IItemsControl;
	getControl(): IControl {
		return this.getMainContainer();
	}
	addColumn(column: GridColumn): void {
		let container = this.getMainContainer();
		let columnView = this.createColumnView(column);
		let columnControl = columnView.getControl();
		container.addItem(columnControl);
	}
	getMainContainer(): IItemsControl {
		if (this._mainContainer) {
			return this._mainContainer;
		}
		let container = new Container();
		container.addClass("columns-view");
		return this._mainContainer = container;
	}
	createColumnView(gridColumn: GridColumn): ColumnView {
		return new ColumnView(gridColumn);
	}
}
