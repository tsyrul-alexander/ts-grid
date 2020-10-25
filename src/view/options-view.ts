import {BaseView} from "./base-view";
import {IControl} from "./control/control";
import {Container} from "./control/container/container";
import {GridOptions} from "../model/grid/grid-options";
import {Label} from "./control/text/label";

export class OptionsView extends BaseView {
	protected pageRowsCountLabel: Label;
	constructor(public options: GridOptions) {
		super();
	}
	getControl(): IControl {
		return new Container();
	}
}
