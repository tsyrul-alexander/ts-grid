import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid/grid-column";
import {RowViewModel} from "../view-model/row-view-model";
import {RowView} from "./row-view";
import {IItemsControl} from "./control/items-control";

export class RowsView extends BaseView {
	private _mainContainer: IItemsControl;
	protected get mainContainer(): IItemsControl {
		if (this._mainContainer) {
			return this._mainContainer;
		}
		return this._mainContainer = this.createContainer();
	}
	constructor(public columns: ICollection<GridColumn>) {
		super();
	}
	addRow(viewModel: RowViewModel) {
		let view = this.createRowView(viewModel);
		let container = this.mainContainer;
		container.addItem(view.getControl());
		return view;
	}
	createRowView(viewModel: RowViewModel): RowView {
		return new RowView(viewModel, this.columns);
	}
	getControl(): IControl {
		return this.mainContainer;
	}
	createContainer(): IItemsControl {
		let container = new Container();
		container.addClass("rows-view");
		return container;
	}
	clear() {
		if (!this._mainContainer) {
			return;
		}
		this.mainContainer.clear();
	}
}
