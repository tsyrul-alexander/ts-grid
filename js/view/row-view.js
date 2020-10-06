class TSRowView extends TSBaseView {
	#rowTemplate;
	getView() {
		if (this.#rowTemplate !== null) {
			return #rowTemplate;
		}
		#rowTemplate = TSBaseView.createTemplate("<div class='ts-row'></div>");
		return #rowTemplate;
	}
	getViewTemplate() {

	}
}
