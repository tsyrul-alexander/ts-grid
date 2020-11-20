import {Exception} from "./exception";

export class NotInitializeException extends Exception {
	constructor(message: string = null) {
		super(message || "Item not initialize!")
	}
	getName() {
		return "NotInitializeException";
	}
}
