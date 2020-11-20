import {BaseView} from "./base-view";
import {GridColumn} from "../model/grid/grid-column";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {ColumnView} from "./column-view";
import {IItemsControl} from "./control/items-control";
import {ICollection} from "../model/collection/collection";

export class ColumnsView extends BaseView {
	protected mainContainer: IItemsControl;

	constructor(public columns: ICollection<GridColumn>) {
		super();
	}
	protected createControl() {
		super.createControl();
		this.mainContainer = this.createMainContainer();
	}
	protected createMainContainer(): IItemsControl {
		let container = new Container();
		container.addClass("columns-view");
		return container;
	}
	protected createColumnView(gridColumn: GridColumn): ColumnView {
		return new ColumnView(this.columns, gridColumn);
	}
	public getControl(): IControl {
		return this.mainContainer;
	}
	public addColumn(column: GridColumn): void {
		let columnView = this.createColumnView(column);
		columnView.init();
		let columnControl = columnView.getControl();
		this.mainContainer.addItem(columnControl);
	}
	public destroy(): void {
		super.destroy();
		this.mainContainer.clear();
	}
}
