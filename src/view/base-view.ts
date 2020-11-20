import {IControl} from "./control/control";
import {IView} from "./view";
import {IDestroy} from "../model/destroy";
import {GridColumn} from "../model/grid/grid-column";
import {IInitialize} from "../model/initialize";

export abstract class BaseView implements IView, IDestroy, IInitialize {
	public init(): void {
		this.createControl();
		this.initControl();
		this.subscribe();
	}
	abstract getControl(): IControl;
	public destroy(): void {
		this.unsubscribe();
	}
	protected createControl(): void {}
	protected initControl(): void {}
	protected subscribe(): void {}
	protected unsubscribe(): void {}
	protected setColumnOrderToControl(control: IControl, column: GridColumn): void {
		if (Number.isInteger(column.order) && column.order !== 0) {
			control.setStyle("order", column.order.toString());
		}
	}
	protected setColumnWeightToControl(control: IControl, column: GridColumn): void {
		control.setAttribute("column", column.weight.toString());
	}
}
