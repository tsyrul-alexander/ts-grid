import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {RowViewModel} from "../view-model/row-view-model";
import {RowView} from "./row-view";
import {IItemsControl} from "./control/items-control";
import {Grid} from "../model/grid/grid";

export class RowsView extends BaseView {
	protected mainContainer: IItemsControl;
	protected views: RowView[] = [];
	constructor(public grid: Grid) {
		super();
	}

	protected createControl() {
		super.createControl();
		this.mainContainer = this.createMainContainer();
	}
	protected createRowView(viewModel: RowViewModel): RowView {
		let rowView = new RowView(viewModel, this.grid.columns);
		this.subscribeRowViewEvents(rowView);
		return rowView;
	}
	protected createMainContainer(): IItemsControl {
		let container = new Container();
		container.addClass("rows-view");
		return container;
	}
	protected subscribeRowViewEvents(rowView: RowView): void {
		rowView.click.on(this.onRowViewClick, this);
	}
	protected unsubscribeRowViewEvents(rowView: RowView): void {
		rowView.click.on(this.onRowViewClick, this);
	}
	protected onRowViewClick(rowView: RowView) {
		this.grid.activeRow = rowView.viewModel;
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
		this.views.forEach(view => {
			this.unsubscribeRowViewEvents(view);
			view.destroy()
		});
	}
	public destroy(): void {
		super.destroy();
		this.clear();
	}
}
