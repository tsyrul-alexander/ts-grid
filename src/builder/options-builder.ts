import {BaseBuilder, IBuilder} from "./base-builder";
import {IControl} from "../view/control/control";
import {OptionsView} from "../view/options-view";
import {GridOptions} from "../model/grid/grid-options";
import {Grid} from "../model/grid/grid";

export interface IOptionBuilder extends IBuilder { }

export class OptionsBuilder extends BaseBuilder implements IOptionBuilder {
	protected optionsView: OptionsView;

	constructor(public grid: Grid) {
		super();
	}
	protected createView(options: GridOptions): OptionsView {
		return new OptionsView(options);
	}
	public init(): void {
		super.init();
		this.optionsView = this.createView(this.grid.options);
		this.optionsView.init();
	}
	public getControl(): IControl {
		return this.optionsView.getControl();
	}
	public destroy(): void {
		super.destroy();
		this.optionsView.destroy();
	}
}
