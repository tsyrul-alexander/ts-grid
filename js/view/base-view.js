class TSBaseView {
	constructor(item) {
		this.item = item;
	}
	getView() {
		throw new TSNotImplementedException();
	}
	static createTemplate(html) {
		let template = document.createElement('template');
		template.innerHTML = html.trim();
		return template.content.firstChild;
	}
}
