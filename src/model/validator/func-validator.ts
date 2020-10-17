import {Validator} from "./validator";
import {Utilities} from "../../utilities";
import {ValidationResult} from "./validation-result";

export class FuncValidator extends Validator {
	func: (item) => ValidationResult;
	constructor(func) {
		super();
		Utilities.checkRequiredParameter(func, "func");
		this.func = func;
	}
	getIsValid(item: any): ValidationResult {
		return this.func(item);
	}
}
