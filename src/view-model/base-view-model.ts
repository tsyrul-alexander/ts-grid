import {BaseModel} from "../model/base-model";
import {BaseObject} from "../model/base-object";

export class BaseViewModel<T extends BaseModel> extends BaseObject {
	public model: T;
	constructor() {
		super();
	}
}
