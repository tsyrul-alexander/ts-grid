import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid/grid-column";
import {RowViewModel} from "../view-model/row-view-model";
import {RowView} from "./row-view";
import {IItemsControl} from "./control/items-control";

export class RowsView extends BaseView {
	protected mainContainer: IItemsControl;
	protected views: RowView[] = [];
	constructor(public columns: ICollection<GridColumn>) {
		super();
	}

	protected createControl() {
		super.createControl();
		this.mainContainer = this.createMainContainer();
	}
	protected createRowView(viewModel: RowViewModel): RowView {
		return new RowView(viewModel, this.columns);
	}
	protected createMainContainer(): IItemsControl {
		let container = new Container();
		container.addClass("rows-view");
		return container;
	}
	public addRow(viewModel: RowViewModel): void {
		let view = this.createRowView(viewModel);
		view.init();
		this.views.push(view);
		this.mainContainer.addItem(view.getControl());
	}
	public getControl(): IControl {
		return this.mainContainer;
	}
	public clear() {
		this.mainContainer.clear();
		this.views.forEach(view => view.destroy());
	}
	public destroy(): void {
		super.destroy();
		this.clear();
	}
}
