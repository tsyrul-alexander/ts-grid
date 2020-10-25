import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid/grid-column";
import {RowViewModel} from "../view-model/row-view-model";
import {RowView} from "./row-view";

export class RowsView extends BaseView {
	protected mainContainer: Container;
	protected views: RowView[] = [];
	constructor(public columns: ICollection<GridColumn>) {
		super();
	}
	addRow(viewModel: RowViewModel) {
		let view = this.createRowView(viewModel);
		this.views.push(view);
		return view;
	}
	createRowView(viewModel: RowViewModel): RowView {
		return new RowView(viewModel, this.columns);
	}
	getControl(): IControl {
		if (this.mainContainer) {
			return this.mainContainer;
		}
		this.mainContainer = new Container();
		this.views.forEach(value => {
			this.mainContainer.addItem(value.getControl());
		}, this);
		this.mainContainer.addClass("grid-container-rows");
		return this.mainContainer;
	}
	clear() {
		this.views = [];
		this.mainContainer.clear();
	}
}
