export class Exception {
	public message: string;
	public name: string;
	constructor(message: string) {
		this.message = message;
		this.name = this.getName();
	}
	getName() {
		return "Error";
	}
}
