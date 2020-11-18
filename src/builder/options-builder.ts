import {BaseBuilder, IBuilder} from "./base-builder";
import {IControl} from "../view/control/control";
import {OptionsView} from "../view/options-view";
import {GridOptions} from "../model/grid/grid-options";
import {Container} from "../view/control/container/container";

export interface IOptionBuilder extends IBuilder {
	options: GridOptions;
}

export class OptionsBuilder extends BaseBuilder implements IOptionBuilder {
	private _options: GridOptions;
	public get options(): GridOptions {
		return this._options;
	}
	public set options(value: GridOptions) {
		this._options = value;
	}
	getControl(): IControl {
		let view = this.createView(this.options);
		let container = new Container();
		container.addClass("grid-container-options");
		container.addItem(view.getControl());
		return container;
	}
	createView(options: GridOptions): OptionsView {
		return new OptionsView(options);
	}
}
