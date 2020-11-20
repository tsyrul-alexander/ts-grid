import {IInitialize} from "../model/initialize";
import {IControl} from "../view/control/control";
import {IDestroy} from "../model/destroy";

export interface IBuilder extends IInitialize, IDestroy {
	getControl(): IControl;
}

export abstract class BaseBuilder implements IBuilder {
	public init(): void {}
	public abstract getControl(): IControl;
	public destroy(): void {}
}
