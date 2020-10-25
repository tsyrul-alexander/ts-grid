import {IControl} from "./control/control";
import {IView} from "./view";
import {IDestroy} from "../model/destroy";

export abstract class BaseView implements IView, IDestroy {
	abstract getControl(): IControl;
	destroy(): void {}
}
