import {IControl} from "./control/control";
import {IView} from "./view";

export abstract class BaseView implements IView {
	abstract getControl(): IControl;
}
