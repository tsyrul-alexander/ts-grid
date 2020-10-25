import {BaseBuilder} from "./base-builder";
import {RowViewModel} from "../view-model/row-view-model";
import {RowModel} from "../model/row-model";
import {Collection, ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid/grid-column";
import {RowsView} from "../view/rows-view";
import {IControl} from "../view/control/control";

export class RowBuilder extends BaseBuilder {
	rowsView: RowsView;
	rowsViewModels: ICollection<RowViewModel> = new Collection();
	constructor(public columns: ICollection<GridColumn>) {
		super();
		this.rowsView = new RowsView(this.columns);
	}
	createViewModel(data: object): RowViewModel {
		let model = this.createModel(data);
		return Object.create(new RowViewModel(model), this.getViewModelProperties(model));
	}
	addRow(data: object): RowViewModel {
		let viewModel = this.createViewModel(data);
		this.rowsView.addRow(viewModel);
		this.rowsViewModels.add(viewModel);
		return viewModel;
	}
	getControl(columns: ICollection<GridColumn>): IControl {
		if (this.rowsView) {
			return this.rowsView.getControl();
		}
		this.rowsView = new RowsView(columns);
		return this.rowsView.getControl();
	}
	clear() {
		this.rowsView.clear();
		this.rowsViewModels.clear();
	}
	getViewModelProperties(model: RowModel) {
		let properties = {};
		let columns = model.getColumns();
		columns.forEach(column => {
			this.setViewModelProperty(properties, model, column);
		}, this);
		return properties;

	}
	setViewModelProperty(properties: object, model: RowModel, columnName: string) {
		properties[columnName] = {
			get: function() {
				return this.model.get(columnName);
			},
			set: function(value) {
				this.model.set(columnName, value);
			}
		};
	}
	createModel(data: object) {
		return new RowModel(data);
	}
}
