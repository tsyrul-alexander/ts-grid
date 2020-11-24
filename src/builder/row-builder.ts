import {BaseBuilder, IBuilder} from "./base-builder";
import {RowViewModel} from "../view-model/row-view-model";
import {RowModel} from "../model/row-model";
import {RowsView} from "../view/rows-view";
import {IControl} from "../view/control/control";
import {Grid} from "../model/grid/grid";

export interface IRowBuilder extends IBuilder {
	addRow(data: object): RowViewModel;
	addRowViewModel<T extends RowViewModel>(data: any, type: (new () => T)): T;
	getControl(): IControl;
	clear(): void;
}

export class RowBuilder extends BaseBuilder implements IRowBuilder {
	protected rowsView: RowsView;
	constructor(public grid: Grid) {
		super();
	}

	protected createRowsView(): RowsView {
		return new RowsView(this.grid);
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
	protected addRowViewModelToGrid(viewModel: RowViewModel): void {
		this.rowsView.addRow(viewModel);
		this.grid.rows.add(viewModel);
	}
	public init(): void {
		super.init();
		this.rowsView = this.createRowsView();
		this.rowsView.init();
	}
	public addRow(data: object): RowViewModel {
		let viewModel = this.createViewModel(data, RowViewModel);
		this.addRowViewModelToGrid(viewModel);
		return viewModel;
	}
	public addRowViewModel<T extends RowViewModel>(data: any, type: (new () => T)): T {
		let viewModel = this.createViewModel(data, type);
		this.addRowViewModelToGrid(viewModel);
		return viewModel;
	}
	public getControl(): IControl {
		return this.rowsView.getControl();
	}
	public clear(): void {
		this.rowsView.destroy();
		this.grid.rows.clear();
	}
	public destroy(): void {
		super.destroy();
		this.rowsView.destroy();
	}
}
