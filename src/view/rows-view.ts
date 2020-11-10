import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid/grid-column";
import {RowViewModel} from "../view-model/row-view-model";
import {RowView} from "./row-view";
import {IItemsControl} from "./control/items-control";

export class RowsView extends BaseView {
	protected mainContainer: Container;
	constructor(public columns: ICollection<GridColumn>) {
		super();
	}
	addRow(viewModel: RowViewModel) {
		let view = this.createRowView(viewModel);
		let container = this.getContainer();
		container.addItem(view.getControl());
		return view;
	}
	createRowView(viewModel: RowViewModel): RowView {
		return new RowView(viewModel, this.columns);
	}
	getControl(): IControl {
		let container = this.getContainer();
		return container;
	}
	getContainer(): IItemsControl {
		if (this.mainContainer) {
			return this.mainContainer;
		}
		this.mainContainer = new Container();
		this.mainContainer.addClass("grid-container-rows");
		return this.mainContainer;
	}
	clear() {
		this.mainContainer.clear();
	}
}
