import {IInitialize} from "../model/initialize";
import {GridOptions} from "../model/grid/grid-options";
import {IControl} from "../view/control/control";

export interface IBuilder extends IInitialize {
	getControl(): IControl;
}

export abstract class BaseBuilder implements IBuilder {
	public init(): void {}

	public abstract getControl(): IControl;
}
