import {Exception} from "./exception";

export class RequiredException extends Exception {
	getName() {
		return "RequiredException";
	}
}
