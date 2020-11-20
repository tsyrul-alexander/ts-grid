import {BaseBuilder, IBuilder} from "./base-builder";
import {RowViewModel} from "../view-model/row-view-model";
import {RowModel} from "../model/row-model";
import {Collection, ICollection} from "../model/collection/collection";
import {GridColumn} from "../model/grid/grid-column";
import {RowsView} from "../view/rows-view";
import {IControl} from "../view/control/control";

export interface IRowBuilder extends IBuilder {
	addRow(data: object): RowViewModel;
	addRowViewModel<T extends RowViewModel>(data: any, type: (new () => T)): T;
	getControl(): IControl;
	clear(): void;
}

export class RowBuilder extends BaseBuilder implements IRowBuilder {
	protected rowsView: RowsView;
	rowsViewModels: ICollection<RowViewModel> = new Collection();
	constructor(public columns: ICollection<GridColumn>) {
		super();
	}

	protected createRowsView(): RowsView {
		return new RowsView(this.columns);
	}
	protected createModel(data: object): RowModel {
		return new RowModel(data);
	}
	protected getViewModelProperties(model: RowModel) {
		let properties = {};
		let columns = model.getColumns();
		columns.forEach(column => {
			this.setViewModelProperty(properties, model, column);
		}, this);
		return properties;
	}
	protected setViewModelProperty(properties: object, model: RowModel, columnName: string) {
		properties[columnName] = {
			get: function() {
				return this.model.get(columnName);
			},
			set: function(value) {
				this.model.set(columnName, value);
			}
		};
	}
	protected createViewModel<T extends RowViewModel>(data: object, type: (new () => T)): T {
		let model = this.createModel(data);
		let rowViewModel = new type();
		rowViewModel.model = model;
		return Object.create(rowViewModel, this.getViewModelProperties(model));
	}
	public init(): void {
		super.init();
		this.rowsView = this.createRowsView();
		this.rowsView.init();
	}
	public addRow(data: object): RowViewModel {
		let viewModel = this.createViewModel(data, RowViewModel);
		this.rowsView.addRow(viewModel);
		this.rowsViewModels.add(viewModel);
		return viewModel;
	}
	public addRowViewModel<T extends RowViewModel>(data: any, type: (new () => T)): T {
		let viewModel = this.createViewModel(data, type);
		this.rowsView.addRow(viewModel);
		this.rowsViewModels.add(viewModel);
		return viewModel;
	}
	public getControl(): IControl {
		return this.rowsView.getControl();
	}
	public clear(): void {
		this.rowsView.destroy();
		this.rowsViewModels.clear();
	}
	public destroy(): void {
		super.destroy();
		this.rowsView.destroy();
	}
}
