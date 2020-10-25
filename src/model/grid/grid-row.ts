import {RowViewModel} from "../../view-model/row-view-model";
import {RowView} from "../../view/row-view";

export class GridRow {
	public viewModel: RowViewModel;
	constructor(viewModel: RowViewModel) {
		this.viewModel = viewModel;
	}
}
