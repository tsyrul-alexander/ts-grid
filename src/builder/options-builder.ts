import {BaseBuilder} from "./base-builder";
import {IControl} from "../view/control/control";
import {OptionsView} from "../view/options-view";
import {GridOptions} from "../model/grid/grid-options";
import {Container} from "../view/control/container/container";

export class OptionsBuilder extends BaseBuilder {
	getControl(options: GridOptions): IControl {
		let view = this.createView(options);
		let container = new Container();
		container.addClass("grid-container-options");
		container.addItem(view.getControl());
		return container;
	}
	createView(options: GridOptions): OptionsView {
		return new OptionsView(options);
	}
}
