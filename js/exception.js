class TSException {
	constructor(message) {
		this.message = message;
		this.name = this.getName();
	}
	getName() {
		return "Error";
	}
}

class TSNotImplementedException extends TSException{
	constructor(message) {
		super(message || "Item not implemented!")
	}
	getName() {
		return "NotImplementedException";
	}
}

class TSNullOrEmptyException extends TSException{
	getName() {
		return "NullOrEmptyException";
	}
}
