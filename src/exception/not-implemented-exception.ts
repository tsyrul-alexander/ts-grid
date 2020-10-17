import {Exception} from "./exception";

export class NotImplementedException extends Exception {
	constructor(message: string = null) {
		super(message || "Item not implemented!")
	}
	getName() {
		return "NotImplementedException";
	}
}
