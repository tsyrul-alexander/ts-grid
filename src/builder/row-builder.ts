import {BaseBuilder} from "./base-builder";
import {RowViewModel} from "../view-model/row-view-model";
import {RowModel} from "../model/row-model";
import {RowView} from "../view/row-view";
import {ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid-column";
import {GridRow} from "../model/grid-row";
import {Container} from "../view/control/container/container";

export class RowBuilder extends BaseBuilder {
	createViewModel(data: object): RowViewModel {
		let model = this.createModel(data);
		return Object.create(new RowViewModel(model), this.getViewModelProperties(model));
	}
	createView(viewModel: RowViewModel, columns: ICollection<GridColumn>): RowView {
		return new RowView(viewModel, columns);
	}
	getControl(rows: GridRow[]) {
		let container = new Container();
		container.addClass("grid-container-rows");
		rows.forEach(gridRow => {
			container.addItem(gridRow.view.getControl());
		}, this);
		return container;
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
				this.propertyChanged.fire(columnName);
			}
		};
	}
	createModel(data: object) {
		return new RowModel(data);
	}
}
