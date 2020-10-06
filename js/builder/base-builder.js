class TSRequiredException extends TSException{
	constructor(message) {
		super(message);
	}
}
class TSBaseBuilder {
	static checkRequiredParameter(value, name) {
		if (!value) {
			throw new TSRequiredException("property " + name + "isRequired");
		}
	}
	init() {}
	render(container) {
		let itemView = this.getItemView();
		container.appendChild(itemView);
	}
	getItemView() {
		throw new TSNotImplementedException();
	}
}
