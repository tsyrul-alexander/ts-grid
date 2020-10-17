import {RowViewModel} from "../view-model/row-view-model";
import {RowView} from "../view/row-view";

export class GridRow {
	public viewModel: RowViewModel;
	public view: RowView;
	constructor(viewModel: RowViewModel, view: RowView) {
		this.viewModel = viewModel;
		this.view = view;
	}
}
