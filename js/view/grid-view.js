class TSGridView extends TSBaseView {
	#contentTemplate;
	#gridHeaderTemplate;
	#gridHeaderCaptionTemplate;
	#gridContentTemplate;
	getView() {
		if (this.#contentTemplate) {
			return this.#contentTemplate;
		}
		this.#contentTemplate = TSBaseView.createTemplate("<div class='ts-grid'></div>");
		this.#contentTemplate.appendChild(this.getGridHeaderTemplate());
		this.#contentTemplate.appendChild(this.getGridContentTemplate());
		return this.#contentTemplate;
	}
	getGridHeaderTemplate() {
		if (this.#gridHeaderTemplate) {
			return this.#gridHeaderTemplate;
		}
		this.#gridHeaderTemplate = TSBaseView.createTemplate("<div class='ts-grid-header'></div>");
		this.#gridHeaderTemplate.appendChild(this.getGridHeaderCaptionTemplate());
		return this.#gridHeaderTemplate;
	}
	getGridHeaderCaptionTemplate() {
		if (this.#gridHeaderCaptionTemplate) {
			return this.#gridHeaderCaptionTemplate;
		}
		this.#gridHeaderCaptionTemplate = TSBaseView.createTemplate("<div class='ts-grid-header-caption'>" +
				this.item.caption +
				"</div>");
		return this.#gridHeaderCaptionTemplate;
	}
	getGridContentTemplate() {
		if (this.#gridContentTemplate) {
			return this.#gridContentTemplate;
		}
		this.#gridContentTemplate = TSBaseView.createTemplate("<div class='ts-grid-content'></div>");
		return this.#gridContentTemplate;
	}
}
