import {NotImplementedException} from "../../exception/not-implemented-exception";
import {ValidationResult} from "./validation-result";

export class Validator {
	getIsValid(item: any): ValidationResult {
		throw new NotImplementedException();
	}
}
