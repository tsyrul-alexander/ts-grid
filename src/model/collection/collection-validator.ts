import {CollectionValidateType} from "./collection-validate-type";
import {Validator} from "../validator/validator";

export class CollectionValidator {
	type: CollectionValidateType;
	validator: Validator;
	constructor(type: CollectionValidateType, validator: Validator) {
		this.type = type;
		this.validator = validator;
	}
}
