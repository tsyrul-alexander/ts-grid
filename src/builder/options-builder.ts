import {BaseBuilder, IBuilder} from "./base-builder";
import {IControl} from "../view/control/control";
import {OptionsView} from "../view/options-view";
import {GridOptions} from "../model/grid/grid-options";
import {Container} from "../view/control/container/container";

export interface IOptionBuilder extends IBuilder {
	options: GridOptions;
}

export class OptionsBuilder extends BaseBuilder implements IOptionBuilder {
	protected optionsView: OptionsView;
	public options: GridOptions;

	protected createView(options: GridOptions): OptionsView {
		return new OptionsView(options);
	}
	public init(): void {
		super.init();
		this.optionsView = this.createView(this.options);
	}
	public getControl(): IControl {
		return this.optionsView.getControl();
	}
	public destroy(): void {
		super.destroy();
		this.optionsView.destroy();
	}
}
