import {Exception} from "./exception";

export class NullOrEmptyException extends Exception {
	getName() {
		return "NullOrEmptyException";
	}
}
